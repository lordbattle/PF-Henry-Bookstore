const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { User, Book, Genre, Author, ReviewStore } = require("../db");
const {
  bookFilterAndPagination,
} = require("../helpers/bookFilterAndPagination");
const crypto = require("crypto");
const { Op } = require("sequelize");

const getAllAuthors = () => {};

const getAuthorBytitle = () => {};

const getAuthorById = () => {};

module.exports = {
  getAllAuthors,
  getAuthorBytitle,
  getAuthorById,
};