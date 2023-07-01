const express = require("express");
const { Router } = require("express");
const { loginUser, logoutUser } = require("../handlers/authhandlers");

const AuthRouter = Router();
// Rutas de autenticación
AuthRouter
.post("/login", loginUser)
.post("/logout", logoutUser);


module.exports = AuthRouter;
