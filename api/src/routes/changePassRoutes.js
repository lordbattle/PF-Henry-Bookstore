const { Router } = require("express");
const {
  verifyCurrentPassword,
 
} = require("../handlers/changePassHandler");

const ChangePassRouter = Router();

// Rutas para cambiar la contraseña
ChangePassRouter.put("/", verifyCurrentPassword);

module.exports = ChangePassRouter;
