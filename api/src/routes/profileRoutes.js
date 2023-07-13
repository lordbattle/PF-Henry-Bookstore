const { Router } = require("express");
const {
  getProfileUser,
  updateProfileUser,
  changePassword,
} = require("../handlers/profileUserHandler");


const ProfileRouter = Router();

// Rutas del perfil de usuario

ProfileRouter.get("/", getProfileUser);
ProfileRouter.put("/", updateProfileUser);
ProfileRouter.put("/changePassword", changePassword);

module.exports = ProfileRouter;