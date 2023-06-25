const { Router } = require("express");
const { checkSchema } = require("express-validator");
const { bookNewSchema, bookPutSchema } = require("../schemas/bookSchema");
const { validateRequest } = require("../middleware/validateRequest");
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
  .post("/", checkSchema(bookNewSchema), validateRequest, postBooksHandler)
  .put("/:idBook", checkSchema(bookPutSchema), validateRequest, putBooksHandler)
  .delete("/:idBook", deleteBooksHandler);

module.exports = BooksRouter;
