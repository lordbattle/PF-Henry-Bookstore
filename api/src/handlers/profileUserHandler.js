const { User } = require("../db");
const bcrypt = require("bcryptjs");
const { sendPasswordChange } = require("../config/mailer");

//Profile user

const getProfileUser = async (req, res) => {
  const userFound = await User.findByPk(req.user.id);

  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }

  res.status(200).json({
    id: userFound.id,
    userName: userFound.userName,
    email: userFound.email,
  });
};

const updateProfileUser = async (req, res) => {
  const userFound = await User.findByPk(req.user.id);
  const { userName, email } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Actualizar los campos del perfil del usuario
    user.userName = userName;
    user.email = email;

    // Guardar los cambios en la base de datos
    await user.save();

    res.status(200).json({
      id: user.id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Controlador para verificar la contraseña actual del usuario
const changePassword = async (req, res, next) => {
  const { userId, currentPassword, newPassword } = req.body;
  console.log(userId);
  console.log(currentPassword);
  console.log(newPassword);
  try {
    const userFound = await User.findByPk(userId);

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Actualizar la contraseña del usuario
    const salt = bcrypt.genSaltSync();
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);

    userFound.password = newPasswordHash;
    await userFound.save();

    console.log(userFound.email);
    console.log(userFound.userName);

    const emailSent = await sendPasswordChange(
      userFound.email,
      userFound.userName,
      newPassword
    );
    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      emailSent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProfileUser,
  updateProfileUser,
  changePassword,
};
