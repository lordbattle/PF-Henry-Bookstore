const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../helpers/createAccesToken");

const validateToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.user = user;
  });
  next();
};

module.exports = { validateToken };
