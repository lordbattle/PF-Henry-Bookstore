const { Router } = require("express");
const {
  getBooksHandler,
  getBooksIdHandler,
  postBooksHandler,
  putBooksHandler,
  deleteBooksHandler,
} = require("../handlers/booksHandlers");
const BooksRouter = Router();

BooksRouter.get("/", getBooksHandler)
  .get("/:idBook", getBooksIdHandler)
  .post("/", postBooksHandler)
  .put("/", putBooksHandler)
  .delete("/:idBook", deleteBooksHandler);

module.exports = BooksRouter;
