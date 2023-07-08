const { Op } = require("sequelize");
const moment = require("moment");

const { User, Book, Order, OrderItem, Bill, conn } = require("../db");
const { mercadopago } = require("../config/mercadopago");
const { hasRepeatingValues, defineOrder } = require("../helpers/userHelper");
const {
  validateNumBooks,
  createModelOrderItems,
} = require("../helpers/orderHelper");

const { MERCADOPAGO_NOTIFICATION_URL, MERCADOPAGO_BACK_URLS } = process.env;

// Controller: get order by id
const getOrderById = async (id) => {
  const order = await Order.findByPk(+id, { include: OrderItem });

  if (!order) {
    throw Error("There is no order with the specified id");
  }

  return order;
};

// Controller: returns all available commands
// includes function to paginate for each attribute in db
const getAllOrders = async (data) => {
  const { limit, page, sort, ...rest } = data;
  const pagination = {
    ...(limit && { limit }),
    ...(page && { offset: page * limit }),
  };
  const order = { ...(sort && { order: defineOrder(sort) }) };

  const count = await Order.count({ where: rest });
  const rows = await Order.findAll({
    where: rest,
    include: OrderItem,
    ...pagination,
    ...order,
  });

  return { count, rows };
};

// Function allows you to generate an instance of the order model for users with pending orders
// Parameters: userId
const newInstanceOrderByUserID = async (userId) => {
  return await Order.findOne({
    where: {
      userId,
      status: "pending",
    },
    include: {
      model: OrderItem,
    },
  });
};

// Function validate existence of data sent with the db
// if successful, returns instances of patrons, books, and order found
const orderValidation = async (id_user, items) => {
  const user = await User.findByPk(+id_user);

  // Check if user exists with id
  if (!user) {
    throw Error("There is no user with that id");
  }

  const BooksIds = items.map((item) => item.id);

  // Verify that there are no duplicate values
  if (hasRepeatingValues(BooksIds)) {
    throw Error("Purchase order has duplicate products");
  }

  const { count: countBooks, rows: books } = await Book.findAndCountAll({
    where: {
      id: { [Op.in]: BooksIds },
      active: true,
    },
  });

  // Validate if books exist
  if (countBooks < BooksIds.length) {
    throw Error("One of the sent items does not exist");
  }

  // Check if the user already has a pending order
  const order = await newInstanceOrderByUserID(user.id);

  return {
    user,
    books,
    order,
  };
};

// Function change the stock of a book
// Parameters: 1. instance of the orders, 2. boolean being true positive and false negative
const changeStockBooks = async (order, sign = true, transaction) => {
  const findBooksPromise = order.orderItems.map((item) =>
    Book.findByPk(item.dataValues.bookId, { transaction })
  );
  const books = await Promise.all(findBooksPromise);

  const updatedBooksPromise = order.orderItems.map((item) => {
    const num = sign
      ? +item.dataValues.quantity
      : -Math.abs(item.dataValues.quantity);

    // Update the stock of books
    const book = books.find((book) => book.id === item.dataValues.bookId);

    book.set({ stock: book.stock + num });
    return book.save({ transaction });
  });

  await Promise.all(updatedBooksPromise);
};

// Function insert a new order in db
// Create a preference to the payment market api
// Parameters: 1. user instance, 2. instance of the books, 3. list of items to buy, 4. transaction
// Returns: object with the status of the transaction, preference id and url to pay
const createOrder = async (user, books, items, transaction) => {
  // Validate that the number of books requested is correct
  validateNumBooks(books, items);

  const { orderItemsModel, fullPurchaseValue } = createModelOrderItems(
    books,
    items
  );

  // Defines the start date and end date on which the preference payment can be made
  const startDate = moment().format();
  const endDate = moment().add(3, "days").format();

  // Create order in the db
  const order = await Order.create(
    {
      dueDate: endDate,
      status: "pending",
      total: fullPurchaseValue,
      invoiceStatus: "sin_facturar",
      userId: user.id,
      orderItems: orderItemsModel,
    },
    {
      include: [User, OrderItem],
      transaction,
    }
  );

  // Decrease the stock of books
  await changeStockBooks(order, false, transaction);

  const itemPreferences = order.orderItems.map((oi) => oi.dataValues);

  // Create model preferences
  const preferences = {
    metadata: { id_order: order.id, email: user.email },
    items: itemPreferences,
    back_urls: {
      success: MERCADOPAGO_BACK_URLS,
      failure: MERCADOPAGO_BACK_URLS,
      pending: MERCADOPAGO_BACK_URLS,
    },
    notification_url: MERCADOPAGO_NOTIFICATION_URL,
    // This option will redirect the user to our website automatically
    auto_return: "approved",
    expires: true,
    expiration_date_from: moment(startDate).toISOString(true),
    expiration_date_to: moment(endDate).toISOString(true),
  };

  // Create preference
  const results = await mercadopago.preferences.create(preferences);

  // Update the id and the total to pay
  await order.update({ preferenceId: results.body.id }, { transaction });

  // Inserting the data if the whole process was successful
  await transaction.commit();

  return { id: results.body.id, init_point: results.body.init_point };
};

// Function updates transactions and payment market api preferences when there is a pending order
// Parameters: 1. instance of the books, 2. list of items to buy, 3. instance of the order 4. transaction
// Returns: object with the status of the transaction, preference id and url to pay
const updateOrderByInstance = async (books, items, order, transaction) => {
  // Undo product quantity removal
  await changeStockBooks(order, true, transaction);

  // Validate that the number of books requested is correct
  validateNumBooks(books, items);

  const { orderItemsModel, fullPurchaseValue } = createModelOrderItems(
    books,
    items
  );

  await order.update({ total: fullPurchaseValue }, { transaction });

  const promiseDeleteItems = order.orderItems.reduce((acc, item) => {
    if (orderItemsModel.some((oi) => oi.bookId === item.dataValues.bookId)) {
      return acc;
    }
    return [...acc, item.destroy({ transaction })];
  }, []);

  await Promise.all(promiseDeleteItems);

  const promiseUpdateItems = orderItemsModel.map((oi) => {
    if (
      !order.orderItems.some((item) => item.dataValues.bookId === oi.bookId)
    ) {
      return OrderItem.create({ ...oi, orderId: order.id }, { transaction });
    }

    const item = order.orderItems.find(
      (item) => item.dataValues.bookId === oi.bookId
    );

    item.set(oi);
    return item.save({ transaction });
  });

  const itemsUpdates = await Promise.all(promiseUpdateItems);

  const newOrder = { orderItems: itemsUpdates };

  // Decrease the stock of books
  await changeStockBooks(newOrder, false, transaction);

  const itemPreferences = order.orderItems.map((oi) => oi.dataValues);

  const results = await mercadopago.preferences.update({
    id: order.preferenceId,
    items: itemPreferences,
  });
  console.log("aqui vamos 2");
  // Inserting the data if the whole process was successful
  await transaction.commit();

  return { id: results.body.id, init_point: results.body.init_point };
};

// Controller allows you to create new orders in db
// It works by integrating the Mercado Pago API, which allows you to pay for purchases made by buyers
// Update an order in case it has the pending status
const insertOrder = async (id_user, items) => {
  // Transaction creation
  const transaction = await conn.transaction();

  try {
    // Previous validations
    const { user, books, order } = await orderValidation(id_user, items);

    return !order
      ? await createOrder(user, books, items, transaction)
      : await updateOrderByInstance(books, items, order, transaction);
  } catch (e) {
    // Undo the insertion of the data in case of error
    await transaction.rollback();
    throw Error(e.message);
  }
};

// Check payment status through notifications Webhook
const receiveWebhook = async (query) => {
  console.log(query);
  try {
    if (query.type === "payment") {
      const paymentData = await mercadopago.payment.findById(query["data.id"]);
      const merchantOrder = await mercadopago.merchant_orders.findById(
        paymentData.body.order.id
      );
      const preferenceId = merchantOrder.body.preference_id;
      const status = paymentData.body.status;

      const order = await Order.findByPk(paymentData.body.metadata.id_order, {
        include: [OrderItem],
      });

      if (status === "approved") {
        // Create invoice
        await Bill.create(
          {
            total: order.total,
            userId: order.userId,
            orderId: order.id,
          },
          {
            include: [User, Order],
          }
        );

        // Update invoice status
        order.set({ status, invoiceStatus: "con_factura" });
        await order.save();

        return paymentData.body.metadata;
      }

      return status;
    }
  } catch (e) {
    throw Error(e.message);
  }
};

const rejectExpiredOrders = async () => {
  // Payment rejected
  const orders = await Order.findAll({
    where: {
      status: "pending",
      dueDate: {
        [Op.lte]: moment().format(),
      },
    },
    include: {
      model: OrderItem,
    },
  });

  orders.map(async (order) => {
    // Update estatus order "reject"
    order.set({ status: "reject" });
    await order.save();

    // Undo product quantity removal
    await changeStockBooks(order, true, transaction);
  });
};

module.exports = {
  getOrderById,
  getAllOrders,
  insertOrder,
  receiveWebhook,
  rejectExpiredOrders,
};
