const express = require("express");
const { Router } = require("express");
const {
  getProfileUser,
  updateProfileUser,
} = require("../handlers/profileUserHandler");
const validateToken = require("../middleware/validateToken");

const ProfileRouter = Router();

// Rutas del perfil de usuario

ProfileRouter
.get("/", validateToken, getProfileUser)
.put(
  "/",
  updateProfileUser
);

module.exports = ProfileRouter;
