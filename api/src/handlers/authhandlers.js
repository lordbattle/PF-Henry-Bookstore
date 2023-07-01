const { createAccessToken } = require("../helpers/createAccesToken");
const { User } = require("../db");
const bcrypt = require("bcryptjs");

//Loging user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid user" });
    }

    const token = await createAccessToken({ id: userFound.id });

    res.cookie("token", token);

    res.status(200).json({
      id: userFound.id,
      userName: userFound.userName,
      email: userFound.email,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

//Logout user

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    res.status(200).send("Successful user logout");
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
