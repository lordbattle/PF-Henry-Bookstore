const { Router } = require("express");
const {
  getBooksHandler,
  getBooksIdHandler,
  postBooksIdHandler,
  putBooksHandler,
  deleteBooksHandler,
} = require("../handlers/booksHandlers");
const BooksRouter = Router();

BooksRouter.get("/", getBooksHandler)
  .get("/:idBooks", getBooksIdHandler)
  .post("/", postBooksIdHandler)
  .put("/", putBooksHandler)
  .delete("/:idBooks", deleteBooksHandler);

module.exports = BooksRouter;
