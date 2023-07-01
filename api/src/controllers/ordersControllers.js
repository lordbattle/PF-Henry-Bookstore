const { User, Book, Order, OrderItem, Bill, conn } = require("../db");
const { Op } = require("sequelize");

const { MERCADOPAGO_NOTIFICATION_URL } = process.env;

const { mercadopago } = require("../config/mercadopago");
const { hasRepeatingValues } = require("../helpers/userHelper");

// Validations prior to the creation of new orders
const orderValidation = async (id_user, items) => {
  try {
    const user = await User.findByPk(+id_user);

    // Check if user exists
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

    // Validate if there is the number of books requested
    if (
      books.some((book) => {
        const itemQuantity = items.find(
          (item) => item.id === book.dataValues.id
        )?.quantity;

        return book.dataValues.stock < itemQuantity || itemQuantity < 1;
      })
    ) {
      throw Error("There are not enough units of the book");
    }

    // Check if the user already has a pending order
    const order = await Order.findOne({
      where: {
        userId: user.id,
        status: "pending",
      },
      include: {
        model: OrderItem,
      },
    });

    return {
      user,
      books,
      order,
    };
  } catch (e) {
    throw Error(e.message);
  }
};

//Create order items
const createOrderItems = async (items, books) => {
  const preOrderItems = books.map((book) => ({
    ...book.dataValues,
    unit_price: book.dataValues.price,
    quantity: items.find((item) => item.id === book.id).quantity,
  }));

  // Create type order items
  const orderItems = preOrderItems.map((pre) => {
    return {
      title: pre.title,
      unit_price: pre.unit_price,
      quantity: pre.quantity,
      bookId: pre.id,
    };
  });

  // Full purchase value
  const fullPurchaseValue = orderItems.reduce(
    (acc, cur) => cur.unit_price * cur.quantity + acc,
    0
  );

  return {
    orderItems,
    fullPurchaseValue,
  };
};

// Create order
const createOrder = async (user, books, items) => {
  const { orderItems, fullPurchaseValue } = await createOrderItems(
    items,
    books
  );
  // Create order in the db
  const order = await Order.create(
    {
      date: new Date(),
      status: "pending",
      total: fullPurchaseValue,
      invoiceStatus: "sin facturar",
      userId: user.id,
      orderItems,
    },
    {
      include: [User, OrderItem],
    }
  );

  order.orderItems.forEach(async (item) => {
    const book = await Book.findByPk(item.dataValues.bookId);

    // Update the stock of books
    book.set({ stock: book.stock - item.dataValues.quantity });
    await book.save();
  });

  const itemPreferences = order.orderItems.map((oi) => oi.dataValues);

  // Create type preferences
  const preferences = {
    metadata: { id_order: order.id, email: user.email },
    payer: {
      name: user.userName,
      email: user.email,
    },
    items: itemPreferences,
    back_urls: {
      success: "http://localhost:5173/",
      failure: "http://localhost:5173/",
      pending: "http://localhost:5173/",
    },
    notification_url: MERCADOPAGO_NOTIFICATION_URL,
    // This option will redirect the user to our website automatically
    auto_return: "approved",
  };

  // Create preference
  const results = await mercadopago.preferences.create(preferences);

  // Update the id and the total to pay
  order.set({ preferenceId: results.body.id });
  await order.save();

  // Inserting the data if the whole process was successful
  //await transaction.commit();

  return { id: results.body.id, init_point: results.body.init_point };
};

// Update order by instance
const updateOrderByInstance = async (items, books, order) => {
  const { orderItems, fullPurchaseValue } = await createOrderItems(
    items,
    books
  );

  order.set(
    {
      orderItems,
      total: fullPurchaseValue,
    },
    {
      include: [OrderItem],
    }
  );

  await order.save();

  const itemPreferences = order.orderItems.map((oi) => oi.dataValues);

  const results = await mercadopago.preferences.update({
    id: order.preferenceId,
    items: itemPreferences,
  });

  return { id: results.body.id, init_point: results.body.init_point };
};

// Create and insert a new order both in the database and in the payment marking
const insertOrder = async (id_user, items) => {
  // Transaction creation
  //const transaction = await conn.transaction();

  try {
    // Previous validations
    const { user, books, order } = await orderValidation(id_user, items);

    return order
      ? await updateOrderByInstance(items, books, order)
      : await createOrder(user, books, items);

    //return await createOrder(user, books, items);
  } catch (e) {
    // Undo the insertion of the data in case of error
    //await transaction.rollback();
    throw Error(e.message);
  }
};

// Check payment status through notifications Webhook
const receiveWebhook = async (query) => {
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
        console.log("si entramos aqui", status === "approved");
        const bill = await Bill.create(
          {
            date: new Date(),
            total: order.total,
            userId: order.userId,
            orderId: order.id,
          },
          {
            include: [User, Order],
          }
        );

        // Update invoice status
        order.set({ status, invoiceStatus: "con factura" });
        await order.save();

        return paymentData.body.metadata;
      }
      // Undo product quantity removal
      order.orderItems.forEach(async (item) => {
        const book = await Book.findByPk(item.dataValues.bookId);

        // Update the stock of books
        book.set({ stock: book.stock + item.dataValues.quantity });
        await book.save();
      });
    }
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = {
  insertOrder,
  receiveWebhook,
};