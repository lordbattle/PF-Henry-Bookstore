const {
  createAccessToken,
  TOKEN_SECRET,
} = require("../helpers/createAccesToken");
const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    if (userFound.banned === true) {
      throw new Error(`User banned`);
    }

    const token = await createAccessToken({ id: userFound.id });

    res.cookie(
      "token",
      token /* {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    } */
    );

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

//Authentication token
const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });

      const userFound = await User.findByPk(user.id);
      if (!userFound) return res.status(401).json({ message: "Unauthorized" });

      res.status(200).json({
        id: userFound.id,
        userName: userFound.userName,
        email: userFound.email,
      });
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = {
  loginUser,
  logoutUser,
  verifyToken,
};
