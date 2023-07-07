const { User } = require("../db");

// Controlador para cambiar la contraseña del usuario
async function changePassword(req, res) {
  const { userId, newPassword } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findByPk(userId);

    // Actualizar la contraseña del usuario
    user.password = newPassword;
    await user.save();

    // Respuesta exitosa
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  changePassword,
};
