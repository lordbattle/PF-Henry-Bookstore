/* const {
  saveAllBooksDb,
  getAllBooks,
  getCountryById,
  getCountryByName,
} = require("../controllers/BooksControllers"); */

//Save API data in the DB
//saveAllBooksDb();

const getBooksHandler = async (req, res) => {
  const { name } = req.query;
};

//Get Books by Id
const getBooksIdHandler = async (req, res) => {
  const { idBooks } = req.params;
};

//Post Books
const postBooksIdHandler = async (req, res) => {};

//Put Books
const putBooksHandler = async (req, res) => {};

//Delete Books
const deleteBooksHandler = async (req, res) => {
  const { idBooks } = req.params;
};

module.exports = {
  getBooksHandler,
  getBooksIdHandler,
  postBooksIdHandler,
  putBooksHandler,
  deleteBooksHandler,
};
