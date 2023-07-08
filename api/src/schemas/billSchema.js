const { findDate } = require("./helpers/customSanitizer");

const billGetAllSchema = {
  total: {
    optional: true,
    isNumeric: {
      errorMessage: "Total entered must be a number",
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
  orderId: {
    optional: true,
    isInt: {
      errorMessage: "The orderrId must be an integer",
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

module.exports = {
  billGetAllSchema,
};
