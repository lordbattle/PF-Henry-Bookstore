const { isEmptyBoolean, isEmptyImageFile, isStringValidate } = require("./helpers/verifyFields");

const bookNewSchema = {
  title: {
    notEmpty: {
      errorMessage: "The title is required",
    },
    isLength: {
      options: { max: 50 },
      errorMessage: `Maximum number of characters ${max} for the title`,
    },
    custom: {
      options: isEmptyImageFile,
    },
    errorMessage: "Only letters, numbers, commas, periods and double periods are accepted",
  },
  subtitle: {
    notEmpty: true,
    errorMessage: "The subtitle is required",
    isLength: {
      options: { max: 200 },
      errorMessage: `Maximum number of characters ${max} for the subtitle`,
    },
  },
  publishedDate: {
    notEmpty: {
      errorMessage: "The publishedDate is required",
    },
    isInt: {
      errorMessage: "PublishedDate must be an integer",
    },
    isLength: {
      options: { min: 1800, max: 2030 },
      errorMessage: `The publication date must be between ${min} and ${max}`,
    },
  },
  publisher: {
    notEmpty: {
      errorMessage: "The publisher is required",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: `Maximum number of characters ${max} for the publisher`,
    },
  },
  description: {
    notEmpty: true,
    errorMessage: "The description is required",
  },
  pages: {
    notEmpty: {
      errorMessage: "The pages is required",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "pages must be an integer",
    },
  },
  /* averageRating: {
    notEmpty: true,
    errorMessage: "The averageRating is required",
  },
  usersRating: {
    notEmpty: true,
    errorMessage: "The usersRating is required",
    isIn: { options: ['1', '2','3', '4','5'] },
  }, */
  identifier: {
    notEmpty: true,
    errorMessage: "The identifier is required",
  },
  bookPic: {
    custom: {
      options: isEmptyImageFile,
    },
    errorMessage: "The file sent is not an image",
  },
  authors: {
    notEmpty: true,
    errorMessage: "The authors is required",
  },
  genre: {
    notEmpty: true,
    errorMessage: "The genre is required",
  },
};

module.exports = bookNewSchema;
