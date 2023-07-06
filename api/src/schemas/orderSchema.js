const { generateStructureByKey } = require("./helpers/validationStructure");
const {
  orderValidationIdUser,
  orderValidationItems,
  orderValidationItemsId,
  orderValidationItemsQuantity,
} = require("./utilities/orderValidation");

const orderNewSchema = {
  id_user: generateStructureByKey(orderValidationIdUser),
  items: generateStructureByKey(orderValidationItems),
  "items.*.id": generateStructureByKey(orderValidationItemsId),
  "items.*.quantity": generateStructureByKey(orderValidationItemsQuantity),
};

module.exports = {
  orderNewSchema,
};
