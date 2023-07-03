const { Router } = require("express");
const {
  loginUser,
  logoutUser,
  verifyToken,
} = require("../handlers/authhandlers");
const { userGoogleMiddelware } = require("../middleware/userGoogleMiddelware");

const AuthRouter = Router();
// Rutas de autenticación
AuthRouter.post("/login", userGoogleMiddelware, loginUser)
  .post("/logout", logoutUser)
  .get("/verifyuser", verifyToken);

module.exports = AuthRouter;
