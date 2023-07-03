const { Router } = require("express");
const { validateToken } = require("../middleware/validateToken");
const {
  getProfileUser,
  updateProfileUser,
} = require("../handlers/profileUserHandler");


const ProfileRouter = Router();

// Rutas del perfil de usuario

ProfileRouter.get("/", validateToken, getProfileUser);
ProfileRouter.put("/", validateToken, updateProfileUser);

module.exports = ProfileRouter;
