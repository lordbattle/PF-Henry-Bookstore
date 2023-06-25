const nodemailer = require("nodemailer");
const { MAILER_HOST, MAILER_PORT, MAILER_USERNAME, MAILER_PASSWORD } =
  process.env;

// Creation of the transporter with the required configuration for outlook
const transporter = nodemailer.createTransport({
  host: MAILER_HOST,
  secureConnection: false, // TLS requires secureConnection to be false
  port: MAILER_PORT,
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: MAILER_USERNAME,
    pass: MAILER_PASSWORD,
  },
});

// Send welcome email to a new user
const sendNewUserEmail = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: `Bookstore ${MAILER_USERNAME}`,
      to: toEmail,
      subject: "Welcome to bookstore",
      html: `
        <div style="padding: 0 10%; margin: 0; box-sizing: border-box; height: 100%; width: 100%;">
            <div style="padding: 40px 0; height: 100%; background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);">
                <div style="width: 100%; height: 100%; padding: auto; background: transparent;">
                    <div style="width: 100%; height: 100%; padding: 0 19%; background: transparent; box-sizing: border-box;">
                        <h5 style="font-size: 14px; color: #fff; margin-bottom: 40px;">Hello ${name}</h5>
                        <h4 style="color: #fff; font-size: 18px; font-weight: Medium; letter-spacing: 2px; margin-bottom: 10px;">¡Welcome!</h4>
                        <h1 style="font-size: 45px; font-weight: bold; color: #fff; margin: 0 0 45px;">BOOKS-STORE</h1>
                        <p style="color: #fff; font-size: 15px; line-height: 1.9; margin-bottom: 40px;">You have just opened an account in bookstore, <br> you can now buy the books that you like the most</p>
                        <a style="display: inline-block; color: #fff; text-decoration: none; background: rgb(63, 76, 119); padding: 12px 30px; color: white; font-size: 14px; font-weight: bold; line-height: 1.4; border: 1px solid transparent; border-radius: 30px; cursor: pointer;" href="https://desarrolloweb.com/articulos/183.php" target="_blank">Watch Books</a>
                    </div>
                </div>
            </div>
        </div>
        `,
    });

    return true;
  } catch (e) {
    return false;
  }
};

module.exports = {
  sendNewUserEmail,
};
