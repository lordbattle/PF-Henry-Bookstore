const { Book, Order, OrderItem, ReviewStore, Bill } = require("../db");

// Controller: get bill by id
const getBillById = async (id) => {
  const bill = await Bill.findByPk(+id, {
    include: {
      model: Order,
      include: {
        model: OrderItem,
        include: [{ model: Book }, { model: ReviewStore, require: false }],
      },
    },
  });

  if (!bill) {
    throw Error("There is no bill with the specified id");
  }

  return bill;
};

// Control: allows to obtain the list of all orders
// paginated by each of the attributes defined in the model
const getAllBills = async (data) => {
  const { limit, page, sort, ...rest } = data;
  const pagination = {
    ...(limit && { limit }),
    ...(page && { offset: page * limit }),
  };
  const order = { ...(sort && { order: defineOrder(sort) }) };

  const count = await Bill.count({ where: rest });
  const rows = await Bill.findAll({
    where: rest,
    include: {
      model: Order,
      include: {
        model: OrderItem,
        include: [{ model: Book }, { model: ReviewStore, require: false }],
      },
    },
    ...pagination,
    ...order,
  });

  return { count, rows };
};

module.exports = {
  getBillById,
  getAllBills,
};
