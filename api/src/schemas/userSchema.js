const { isEmptyBoolean, isEmptyImageFile } = require("./helpers/verifyFields");

const userNewSchema = {
  userName: {
    notEmpty: true,
    errorMessage: "The name is required",
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
  },
  age: {
    notEmpty: {
      errorMessage: "Age is required",
    },
    isInt: {
      options: { min: 0, max: 120 },
      errorMessage: "Age must be an integer",
    },
  },
  location: {
    notEmpty: true,
    errorMessage: "Location is required",
  },
  genres: {
    notEmpty: true,
    errorMessage: "Genders are required",
  },
  phone: {
    notEmpty: true,
    errorMessage: "Phone is required",
  },
  profilePic: {
    custom: {
      options: isEmptyImageFile,
    },
    errorMessage: "The file sent is not an image",
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
    notEmpty: {
      errorMessage: "GoogleUser is required",
    },
    isBoolean: {
      errorMessage: "GoogleUser must be a boolean value",
    },
  },
};

module.exports = {
  userNewSchema,
};