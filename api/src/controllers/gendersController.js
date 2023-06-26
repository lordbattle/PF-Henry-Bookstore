const axios = require("axios");
require("dotenv").config();
const { API_KEY, API_URL } = process.env;
const { User, Book, Genre, Author, ReviewStore } = require("../db");
const {
  wildcardFilterAndPagination,
} = require("../helpers/wildcardFilterAndPagination");
const crypto = require("crypto");
const { Op } = require("sequelize");

const getAllGender = async () => {
  return await Genre.findAll();
};

/*return books that contain genre, may or may not have the other params
 * order : asc to sort ascending and desc to sort descending
 * price : true to order not by title but by the price of the books in specified order
 * page : page number you want to see from your search
 * limit : limit number of books to view per page*/
const getBookByGenres = async (genre, order, page, limit, price) => {
  let bookByGenre = await Book.findAll({
    where: {
      genre: { [Op.iLike]: "%" + genre + "%" },
    },
  });
  if (order || page || limit)
    return wildcardFilterAndPagination(bookByGenre, order, page, limit, price);
  else return bookByGenre;
};

const getGenderById = async (idBook) => {
  return await Book.findByPk(idBook);
};

module.exports = {
  getAllGender,
  getBookByGenres,
  getGenderById,
};
