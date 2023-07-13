const { Router } = require("express");
const {
  loginUser,
  logoutUser,
  contactAdm,
  forgotPasswordChange,
  forgotPasswordUser,
  verifyToken,
} = require("../handlers/authhandlers");
const { userGoogleMiddelware } = require("../middleware/userGoogleMiddelware");

const AuthRouter = Router();
// Rutas de autenticación
AuthRouter.post("/login", userGoogleMiddelware, loginUser)
  .post("/logout", logoutUser)
  .post("/contact", contactAdm)
  .post("/forgotPassword", forgotPasswordChange)
  .get("/forgotPassword/:email", forgotPasswordUser)
  .get("/verifyuser", verifyToken)

module.exports = AuthRouter;
