const {
  isEmptyBoolean,
  isEmptyImageFile,
  isEmptyField,
  isStartsWithLetter,
  isStringNumberStartValidate,
  isStringValidate,
} = require("./helpers/verifyFields");

const bookNewSchema = {
  title: {
    in: "body",
    notEmpty: {
      errorMessage: "The title is required",
    },

    isLength: {
      options: { max: 50 },
      errorMessage: `Maximum number of characters 50 for the title`,
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The title is required");
        } else if (!isStringNumberStartValidate(value)) {
          throw new Error("The title can only start with letters or numbers");
        } else if (!isStringValidate(value)) {
          throw new Error(
            "Only letters, numbers, commas, periods and double periods are accepted"
          );
        } else {
          return true;
        }
      },
    },
  },
  subtitle: {
    in: "body",
    notEmpty: true,
    errorMessage: "The subtitle is required",
    isLength: {
      options: { max: 200 },
      errorMessage: `Maximum number of characters 200 for the subtitle`,
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The subtitle is required");
        } else if (!isStringNumberStartValidate(value)) {
          throw new Error(
            "The subtitle can only start with letters or numbers"
          );
        } else if (!isStringValidate(value)) {
          throw new Error(
            "Only letters, numbers, commas, periods and double periods are accepted"
          );
        } else {
          return true;
        }
      },
    },
  },
  publishedDate: {
    in: "body",
    notEmpty: {
      errorMessage: "The publishedDate is required",
    },
    isInt: {
      errorMessage: "PublishedDate must be an integer",
      bail: true, // Stop validation if not an integer
    },
    custom: {
      options: (value) => {
        const year = parseInt(value);
        if (year < 1800 || year > 2030) {
          throw new Error("The publication date must be between 1800 and 2030");
        }
        return true;
      },
    },
  },
  publisher: {
    in: "body",
    notEmpty: {
      errorMessage: "The publisher is required",
    },
    isLength: {
      options: { max: 100 },
      errorMessage: `Maximum number of characters 100 for the publisher`,
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The publisher is required");
        } else if (!isStringNumberStartValidate(value)) {
          throw new Error(
            "The publisher can only start with letters or numbers"
          );
        } else if (!isStringValidate(value)) {
          throw new Error(
            "Only letters, numbers, commas, periods and double periods are accepted"
          );
        } else {
          return true;
        }
      },
    },
  },
  description: {
    in: "body",
    notEmpty: {
      errorMessage: "The description is required",
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The description is required");
        } else {
          return true;
        }
      },
    },
  },
  pages: {
    in: "body",
    notEmpty: {
      errorMessage: "The pages is required",
    },
    isInt: {
      in: "body",
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
    in: "body",
    notEmpty: {
      errorMessage: "The identifier is required",
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The identifier is required");
        } else if (!isStringNumberStartValidate(value)) {
          throw new Error("The identifier can only start with letters or numbers");
        } else if (!isStringValidate(value)) {
          throw new Error(
            "Only letters, numbers, commas, periods and double periods are accepted"
          );
        } else {
          return true;
        }
      },
    },
  },
  bookPic: {
    in: "body",
    /* custom: {
      options: isEmptyImageFile,
    },
    errorMessage: "The submitted file is not a .jpg, .jpeg, .png or .gif image", */
    custom: {
      options: (value) => {
        if (!isEmptyImageFile(value)) {
          throw new Error(
            "The submitted file is not a .jpg, .jpeg, .png or .gif image"
          );
        } else {
          return true;
        }
      },
    },
  },
  authors: {
    in: "body",
    notEmpty: {
      errorMessage: "The authors is required",
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The authors is required");
        } else if (!isStartsWithLetter(value)) {
          throw new Error(
            "The authors can only start with letters or numbers and contain periods, commas, and semicolons."
          );
        } else {
          return true;
        }
      },
    },
  },
  genre: {
    in: "body",
    notEmpty: {
      errorMessage: "The genre is required",
    },
    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The genre is required");
        } else if (!isStartsWithLetter(value)) {
          throw new Error(
            "The genre can only start with letters or numbers and contain periods, commas, and semicolons."
          );
        } else {
          return true;
        }
      },
    },
  },
};

const bookPutSchema = {
  ...bookNewSchema, // Copiar todas las propiedades de bookNewSchema

  // Hacer que algunas propiedades sean opcionales para la modificación
  title: {
    ...bookNewSchema.title, // Copiar las reglas de validación de title en bookNewSchema
    optional: true, // Hacer que la propiedad sea opcional
  },
  subtitle: {
    ...bookNewSchema.subtitle,
    optional: true,
  },
  publishedDate: {
    ...bookNewSchema.publishedDate,
    optional: true,
  },
  publisher: {
    ...bookNewSchema.publisher,
    optional: true,
  },
  description: {
    ...bookNewSchema.description,
    optional: true,
  },
  pages: {
    ...bookNewSchema.pages,
    optional: true,
  },
  identifier: {
    ...bookNewSchema.identifier,
    optional: true,
  },
  bookPic: {
    ...bookNewSchema.bookPic,
    optional: true,
  },
  authors: {
    ...bookNewSchema.authors,
    optional: true,
  },
  genre: {
    ...bookNewSchema.genre,
    optional: true,
  },
};

module.exports = { bookNewSchema, bookPutSchema };
