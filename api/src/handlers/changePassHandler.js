const { User } = require("../db");
const changePassController = require("../controllers/changePassControllers");

// Controlador para verificar la contraseña actual del usuario
async function verifyCurrentPassword(req, res, next) {
  const { userId, currentPassword } = req.body;

  try {
    // Aquí puedes utilizar el controlador para verificar la contraseña actual
    await changePassController.verifyCurrentPassword(userId, currentPassword);

    // La contraseña actual es válida, continuar con el siguiente middleware/controlador
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  verifyCurrentPassword,
  
};

