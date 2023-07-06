const { isNumberInteger, isArrayLength } = require("./helpers/verifyFields");
const { findDate } = require("./helpers/customSanitizer");

const orderGetAllSchema = {
  dueDate: {
    optional: true,
    isDate: {
      options: { format: "YYYY-MM-DD" },
      errorMessage: "Expiration date must be in date format",
    },
    customSanitizer: { options: findDate },
  },
  status: {
    optional: true,
    isIn: {
      options: [["approved", "pending", "reject"]],
      errorMessage: "The specified status is not found",
    },
  },
  total: {
    optional: true,
    isNumeric: {
      errorMessage: "Total entered must be a number",
    },
  },
  invoiceStatus: {
    optional: true,
    isIn: {
      options: [["sin_facturar", "con_factura"]],
      errorMessage: "The specified invoiceStatus is not found",
    },
  },
  createdAt: {
    optional: true,
    isDate: {
      options: { format: "YYYY-MM-DD" },
      errorMessage: "CreateAt date must be in date format",
    },
    customSanitizer: { options: findDate },
  },
  userId: {
    optional: true,
    isInt: {
      errorMessage: "The userId must be an integer",
    },
  },
  limit: {
    optional: true,
    isInt: {
      errorMessage: "The limit must be an integer",
    },
  },
  page: {
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "Page must be an integer greater than 0",
    },
    customSanitizer: { options: (value) => value - 1 },
  },
};

const orderPostSchema = {
  id_user: {
    notEmpty: {
      errorMessage: "The id_user is required",
    },
    custom: {
      options: isNumberInteger,
      errorMessage: "The id_user must be an integer",
    },
  },
  items: {
    notEmpty: {
      errorMessage: "Items are required",
    },
    isArray: {
      errorMessage: "The items must be an array",
    },
    custom: {
      options: isArrayLength,
      errorMessage: "At least one book must be sent",
    },
  },
  "items.*.id": {
    notEmpty: {
      errorMessage: "The book id is required",
    },
    isUUID: {
      version: 4,
      errorMessage: "The book id is not correct",
    },
  },
  "items.*.quantity": {
    notEmpty: {
      errorMessage: "The number of books is required",
    },
    custom: {
      options: isNumberInteger,
      errorMessage: "The number of books must be an integer",
    },
  },
};

module.exports = {
  orderGetAllSchema,
  orderPostSchema,
};
