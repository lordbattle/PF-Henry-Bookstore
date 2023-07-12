const reviewStorePostSchema = {
  comment: {
    optional: true,
    isLength: {
      options: { min: 0, max: 500 },
      errorMessage: "The comment can be a maximum of 500 characters",
    },
  },
  score: {
    isInt: {
      options: { min: 0, max: 5 },
      errorMessage: "The score must be an integer between 0 and 5",
    },
  },
  bookId: {
    notEmpty: {
      errorMessage: "The book id is required",
    },
    isUUID: {
      version: 4,
      errorMessage: "The book id is not correct",
    },
  },
  userId: {
    isInt: {
      options: { min: 1 },
      errorMessage: "The userId must be an integer",
    },
  },
  orderItemId: {
    isInt: {
      options: { min: 1 },
      errorMessage: "The OrderItem must be an integer",
    },
  },
};

module.exports = {
  reviewStorePostSchema,
};
