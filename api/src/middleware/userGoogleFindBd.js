const { User } = require("../db");
const { Op } = require("sequelize");

const userGoogleFindBd = async (req, res, next) => {
  let { email, displayName, uid, name } = req.body;

  console.log("Estoy en el middleware google find BD");
  console.log(req.body);

  if (displayName) {
    console.log("Entré al if del middleware find BD");

    const findUserBD = async (email) => {
      try {
        const userByEmail = await User.findOne({
          where: {
            email: {
              [Op.iLike]: `%${email}%`,
            },
          },
        });
        console.log("userByEmail es " + userByEmail);
        return userByEmail;
      } catch (e) {
        throw Error(e.message);
      }
    };

    const user = await findUserBD(email);

    if (user !== null) {
      return res.status(200).send("Usuario registrado en la BD");
    }
  }

  next();
};

module.exports = {
  userGoogleFindBd,
};
