const { Router } = require("express");
const {
  getProfileUser,
  updateProfileUser,
} = require("../handlers/profileUserHandler");


const ProfileRouter = Router();

// Rutas del perfil de usuario

ProfileRouter.get("/", getProfileUser);
ProfileRouter.put("/", updateProfileUser);

module.exports = ProfileRouter;
