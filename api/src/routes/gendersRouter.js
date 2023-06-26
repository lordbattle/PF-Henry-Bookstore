const { Router } = require("express");
const {
  getGenderHandler,
  getGenderIdHandler,
} = require("../handlers/gendersHandlers");
const GendersRouter = Router();

GendersRouter.get("/", getGenderHandler);
GendersRouter.get("/:idGender", getGenderIdHandler);

module.exports = GendersRouter;
