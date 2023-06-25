const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { User, Book, Genre, Author, ReviewStore } = require("../db");
const {
  wildcardFilterAndPagination,
} = require("../helpers/wildcardFilterAndPagination");
const crypto = require("crypto");
const { Op } = require("sequelize");

const getAllAuthors = async () => {
  return await Author.findAll();
};

const getBookByAuthor = async (author, order, page, limit, price) => {
  let bookByAuthors = await Book.findAll({
    where: {
      authors: { [Op.iLike]: "%" + author + "%" },
    },
  });
  if (order || page || limit)
    return wildcardFilterAndPagination(
      bookByAuthors,
      order,
      page,
      limit,
      price
    );
  else return bookByAuthors;
};

const getAuthorById = async (idBook) => {
  return await Book.findByPk(idBook);
};

module.exports = {
  getAllAuthors,
  getBookByAuthor,
  getAuthorById,
};
