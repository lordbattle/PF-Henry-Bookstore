const { User } = require("../db");

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

module.exports = {
  getProfileUser,
  updateProfileUser,
};
