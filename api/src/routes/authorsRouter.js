const { Router } = require("express");
const {
  getAuthorHandler,
  getAuthorIdHandler,
} = require("../handlers/authorsHandlers");
const AuthorsRouter = Router();

AuthorsRouter.get("/", getAuthorHandler);
AuthorsRouter.get("/:idGender", getAuthorIdHandler);

module.exports = AuthorsRouter;
