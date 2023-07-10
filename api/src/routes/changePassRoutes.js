const { Router } = require("express");
const {
  verifyCurrentPassword,
 
} = require("../handlers/changePassHandler");

const ChangePassRouter = Router();

// Rutas para cambiar la contraseña
ChangePassRouter.post("/", verifyCurrentPassword);

module.exports = ChangePassRouter;
