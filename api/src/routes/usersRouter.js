const { Router } = require("express");
const {
  getUsersHandler,
  getUsersIdHandler,
  postUsersIdHandler,
  putUsersHandler,
  deleteUsersHandler
} = require("../handlers/usersHandlers");
const UsersRouter = Router();

UsersRouter.get
      ("/", getUsersHandler)
  .get("/:idUsers", getUsersIdHandler)
  .post("/", postUsersIdHandler)
  .put("/", putUsersHandler)
  .delete("/:idUsers", deleteUsersHandler);

module.exports = UsersRouter;