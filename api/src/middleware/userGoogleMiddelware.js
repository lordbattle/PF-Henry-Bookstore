const bcrypt = require("bcryptjs");
/* Propiedades que faltan:
age, location, genres, phone,   */
const userGoogleMiddelware = (req, res, next) => {
  let { email, displayName, uid, name } = req.body;

  console.log("Estoy en el middelwar google");
  console.log(req.body);

  if (displayName) {
    if (displayName && !name) {
      console.log("Entre al if del midelware");
      const randomDigits = Math.floor(10000 + Math.random() * 90000);
      displayName = displayName.split(" ");
      let userName = `${displayName.join("").slice(0, 12)}${randomDigits}`;

      let emailLower = email.toLowerCase();
      let password = uid.slice(0, 19);
      let name = displayName[0];
      let lastName = displayName[1];
      let googleUser = true;

      let age = 18;
      let location = "not specified";
      let phone = "+54-000-000-0000";

      req.body.userName = userName;
      req.body.lastName = lastName;
      req.body.email = emailLower;
      req.body.name = name;
      req.body.password = password;
      req.body.lastName = lastName;
      req.body.googleUser = googleUser;

      req.body.age = age;
      req.body.location = location;
      req.body.phone = phone;
    } else if (displayName && name) {
      let emailLower = email.toLowerCase();
      let password = uid.slice(0, 19);

      req.body.email = emailLower;
      req.body.password = password;
    }
  }

  next();
};

module.exports = {
  userGoogleMiddelware,
};

/* const googleSignIn = async (email, displayName, uid, isAdmin, isModerator) => {
  displayName = displayName.split(" ");
  let name = displayName[0];
  let lastName = displayName[1];
  let emailLower = email.toLowerCase();
  const user = await User.findOne({
    where: { email: emailLower },
  });
  if (!user) {
    let passwordHash = await bcrypt.hash(uid, 10);
    const user = await User.create({
      name,
      lastName,
      email: emailLower,
      password: passwordHash,
      isAdmin,
      isModerator,
    });
    const Token = jwt.sign(
      {
        user: user,
      },
      encryptKey,
      { expiresIn: encryptExpiration }
    );
    return {
      msg: "User created",
      token: Token,
      name: user.name,
      id: user.userId,
      user: "user",
    };
  }*/
