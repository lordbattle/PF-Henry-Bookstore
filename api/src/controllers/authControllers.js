const axios = require("axios");
require("dotenv").config();
const { User, Book, Genre, Author, ReviewStore } = require("../db");
const { Op } = require("sequelize");

const generateForgotPassword = (length = 20) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  if (length === 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomChar = characters.charAt(randomIndex);

  return randomChar + generateForgotPassword(length - 1);
};

module.exports = {
  generateForgotPassword,
};
