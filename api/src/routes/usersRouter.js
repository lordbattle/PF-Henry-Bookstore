const { Router } = require("express");
const { checkSchema } = require("express-validator");
const { userNewSchema } = require("../schemas/userSchema");
const { validateRequest } = require("../middleware/validateRequest");

const {
  getUsersHandler,
  getUsersIdHandler,
  postUsersIdHandler,
  putUsersHandler,
  deleteUsersHandler,
} = require("../handlers/usersHandlers");

const UsersRouter = Router();

UsersRouter.get("/", getUsersHandler)
  .get("/:idUsers", getUsersIdHandler)
  .post("/", checkSchema(userNewSchema), validateRequest, postUsersIdHandler)
  .put("/", putUsersHandler)
  .delete("/:idUsers", deleteUsersHandler);

module.exports = UsersRouter;
