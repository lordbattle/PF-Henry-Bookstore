const {
  createAccessToken,
  TOKEN_SECRET,
} = require("../helpers/createAccesToken");
const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateForgotPassword } = require("../controllers/authControllers");
const {
  sendForgottenPassword,
  sendPasswordChange,
  sendContactAdm,
} = require("../config/mailer");

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

const contactAdm = async (req, res) => {
  const { name, email, affair, message } = req.body;
  console.log("Estoy en el handler de contactAdm");
  console.log("name es    ", name);
  console.log("email es    ", email);
  console.log("Affair es    ", affair);
  console.log("message es    ", message);

  try {
    const emailSent = await sendContactAdm(email, name, affair, message);
    res.status(200).json({ success: true, email, emailSent });
  } catch (e) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const forgotPasswordUser = async (req, res) => {
  const { email } = req.params;
  console.log("Estoy en el handler de forgotPasswordUser");
  console.log("Email es    ", email);
  try {
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound) {
      return res.status(200).json({ message: "User not found" });
    }

    if (userFound.banned === true) {
      throw new Error(`User banned`);
    }

    const emailSent = await sendForgottenPassword(
      userFound.email,
      userFound.userName
    );

    res.status(200).json({ success: true, email, emailSent });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

const forgotPasswordChange = async (req, res) => {
  const { email, securityQuestion } = req.body;

  console.log("Estoy en el handler forgotPasswordChange");
  console.log("que es req.body   ", req.body);
  console.log("que es email  ", email);
  console.log("que es securityQuestion   ", securityQuestion);

  try {
    const userFound = await User.findOne({ where: { email: email } });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userFound.banned === true) {
      throw new Error(`User banned`);
    }

    if (!userFound.securityQuestion === securityQuestion) {
      return res.status(400).json({ message: "securityQuestion not found" });
    }

    let newPassword = generateForgotPassword();

    const salt = bcrypt.genSaltSync();
    const newPasswordHash = bcrypt.hashSync(newPassword, salt);

    userFound.password = newPasswordHash;
    await userFound.save();

    const emailSent = await sendPasswordChange(
      userFound.email,
      userFound.userName,
      newPassword
    );

    res.status(200).json({ success: true, email, emailSent });
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
  contactAdm,
  forgotPasswordChange,
  forgotPasswordUser,
  verifyToken,
};
