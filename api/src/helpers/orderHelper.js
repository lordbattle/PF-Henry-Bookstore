// Helper verifies the amount of books requested is in the allowed range,
// being greater than 1 and less than the total stock of the db.
// Parameters: 1. receive an array containing an instance of each requested book,
// 2. a list of items to buy.
const validateNumBooks = (books, items) => {
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
};

// Helper creates a model of the items that each order should contain
// Parameters: 1. receive an array containing an instance of each requested book,
// 2. a list of items to buy.
// Returns: 1. model of the items of each order, 2. total value to pay
const createModelOrderItems = (books, items) => {
  const preOrderItems = books.map((book) => ({
    ...book.dataValues,
    unit_price: book.dataValues.price,
    quantity: items.find((item) => item.id === book.id).quantity,
  }));

  // Create model order items
  const orderItemsModel = preOrderItems.map((pre) => {
    return {
      title: pre.title,
      unit_price: pre.unit_price,
      quantity: pre.quantity,
      bookId: pre.id,
    };
  });

  // Full purchase value
  const fullPurchaseValue = orderItemsModel.reduce(
    (acc, cur) => cur.unit_price * cur.quantity + acc,
    0
  );

  return {
    orderItemsModel,
    fullPurchaseValue,
  };
};

module.exports = {
  validateNumBooks,
  createModelOrderItems,
};
