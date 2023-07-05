const { isArrayLength, isUuidV4 } = require("../helpers/verifyFields");

const orderValidationIdUser = [
  ["notEmpty", "The id_user is required"],
  ["isInt", "The id_user must be an integer"],
];

const orderValidationItems = [
  ["notEmpty", "Items are required"],
  ["isArray", "The items must be an array"],
  ["custom", "At least one book must be sent", isArrayLength],
];

const orderValidationItemsId = [
  ["notEmpty", "The book id is required"],
  ["custom", "The book id is not correct", isUuidV4],
];

const orderValidationItemsQuantity = [
  ["notEmpty", "The number of books is required"],
  ["isInt", "The number of books must be an integer"],
];

module.exports = {
  orderValidationIdUser,
  orderValidationItems,
  orderValidationItemsId,
  orderValidationItemsQuantity,
};
