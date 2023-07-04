const {
  isEmptyBoolean,
  isEmptyImageFile,
  isEmptyField,
  isStartsWithLetter,
  isStringNumberStartValidate,
  isStringValidate,
  isStringOnlyLetter,
  isUsernameValidate,
  isPasswordValidate,
  isPhoneValidate,
} = require("./helpers/verifyFields");

const userNewSchema = {
  userName: {
    notEmpty: {
      errorMessage: "The username is required",
    },

    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The username is required");
        } else if (!isUsernameValidate(value)) {
          throw new Error(
            "The username can only start with letters or numbers"
          );
        } else {
          return true;
        }
      },
    },

    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: `Username must contain between 8 and 20 characters`,
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Mail is required",
    },
    isEmail: {
      errorMessage: "is not Mail",
    },
  },
  password: {
    notEmpty: true,
    errorMessage: "Password is required",

    isLength: {
      options: { min: 8, max: 20 },
      errorMessage: `Password must contain between 8 and 20 characters`,
    },

   /*  custom: {
      options: (value) => {
        if (!isPasswordValidate(value)) {
          throw new Error(
            "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character"
          );
        } else {
          return true;
        }
      },
    }, */
  },
  name: {
    notEmpty: {
      errorMessage: "The name is required",
    },

    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The name is required");
        } else if (!isStringOnlyLetter(value)) {
          throw new Error("The name can only contain letters");
        } else {
          return true;
        }
      },
    },

    isLength: {
      options: { max: 35 },
      errorMessage: `name must contain max 35 characters`,
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "The lastName is required",
    },

    custom: {
      options: (value) => {
        if (!isEmptyField(value)) {
          throw new Error("The lastName is required");
        } else if (!isStringOnlyLetter(value)) {
          throw new Error("The lastname can only contain letters");
        } else {
          return true;
        }
      },
    },

    isLength: {
      options: { max: 35 },
      errorMessage: `lastname must contain max 35 characters`,
    },
  },
  age: {
    //notEmpty: {errorMessage: "Age is required",},
    isInt: {
      errorMessage: "Age must be an integer",
    },

    custom: {
      options: (value) => {
        const year = parseInt(value);
        const min = 18;
        const max = 90;
        if (year < min || year > max) {
          throw new Error(
            `The publication date must be between the years ${min} and ${max}`
          );
        }
        return true;
      },
    },
  },
  location: {
    //notEmpty: true,
    errorMessage: "Location is required",
  },
  genres: {
    isIn: { options: ["male", "female"] },
    errorMessage: "Genders male or female",
  },
  phone: {
    //notEmpty: {errorMessage: "Phone is required"},
    custom: {
      options: (value) => {
        if (!isPhoneValidate(value)) {
          throw new Error("Telephone numbers in the format +xx-xxx-xxx-xxxx");
        } else {
          return true;
        }
      },
    },
  },
  profilePic: {
    custom: {
      options: isEmptyImageFile,
    },
    errorMessage: "The submitted file is not a .jpg, .jpeg, .png or .gif image",
    optional: true,
  },
  active: {
    custom: {
      options: isEmptyBoolean,
    },
    errorMessage: "Active must be a boolean value",
  },
  banned: {
    custom: {
      options: isEmptyBoolean,
    },
    errorMessage: "Banned must be a boolean value",
  },
  admin: {
    custom: {
      options: isEmptyBoolean,
    },
    errorMessage: "Admin must be a boolean value",
  },
  googleUser: {
    custom: {
      options: isEmptyBoolean,
    },
    errorMessage: "GoogleUser must be a boolean value",
  },
};

const userPutSchema = {
  ...userNewSchema,

  // Make some properties optional for modification
  userName: {
    ...userNewSchema.userName, // Copy the title validation rules to userNewSchema
    optional: true, // Make the property optional
  },
  email: {
    ...userNewSchema.email,
    optional: true,
  },
  password: {
    ...userNewSchema.password,
    optional: true,
  },
  age: {
    ...userNewSchema.age,
    optional: true,
  },
  location: {
    ...userNewSchema.location,
    optional: true,
  },
  genres: {
    ...userNewSchema.genres,
    optional: true,
  },
  phone: {
    ...userNewSchema.phone,
    optional: true,
  },
  profilePic: {
    ...userNewSchema.profilePic,
    optional: true,
  },
  active: {
    ...userNewSchema.active,
    optional: true,
  },
  admin: {
    ...userNewSchema.admin,
    optional: true,
  },
  googleUser: {
    ...userNewSchema.googleUser,
    optional: true,
  },
};

module.exports = {
  userNewSchema,
  userPutSchema,
};
