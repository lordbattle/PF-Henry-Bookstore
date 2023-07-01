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
};

module.exports = {
  getProfileUser,
  updateProfileUser
};
