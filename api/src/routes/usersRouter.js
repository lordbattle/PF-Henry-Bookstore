const { Router } = require("express");
const { checkSchema } = require("express-validator");
const { userNewSchema, userPutSchema } = require("../schemas/userSchema");
const { validateRequest } = require("../middleware/validateRequest");
const { userGoogleFindBd } = require("../middleware/userGoogleFindBd");
const { userGoogleMiddelware } = require("../middleware/userGoogleMiddelware");

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
  .post(
    "/",
    userGoogleFindBd,
    userGoogleMiddelware,
    checkSchema(userNewSchema),
    validateRequest,
    postUsersIdHandler
  )
  .put(
    "/:idUsers",
    checkSchema(userPutSchema),
    validateRequest,
    putUsersHandler
  )
  .delete("/:idUsers", deleteUsersHandler);

module.exports = UsersRouter;
