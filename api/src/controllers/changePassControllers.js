const { sendPasswordChange } = require("../config/mailer");
const { User } = require("../db");
const bcrypt = require("bcryptjs");

// Controlador para cambiar la contraseña del usuario
async function changePassword(req, res) {
  const { userId, newPassword } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const userFound = await User.findByPk(userId);

    // Actualizar la contraseña del usuario
   
    const salt = bcrypt.genSaltSync();
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);

    userFound.password = newPasswordHash;
    await userFound.save();

    const emailSent = await sendPasswordChange(userFound.email, userFound.userName);
     // Respuesta exitosa
    res.status(200).json({ success: true, message: "Password changed successfully", emailSent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  changePassword,
};
