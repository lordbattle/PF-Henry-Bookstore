const { Router } = require("express");
const { loginUser, logoutUser, verifyToken } = require("../handlers/authhandlers");

const AuthRouter = Router();
// Rutas de autenticación
AuthRouter
.post("/login", loginUser)
.post("/logout", logoutUser)
.get("/verifyuser", verifyToken);


module.exports = AuthRouter;
