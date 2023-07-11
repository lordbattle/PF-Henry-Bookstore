const nodemailer = require("nodemailer");
const {
  MAILER_HOST,
  MAILER_PORT,
  MAILER_USERNAME,
  MAILER_PASSWORD,
  MAILER_LINK_FRONT,
} = process.env;

// Creation of the transporter with the required configuration for outlook
const transporter = nodemailer.createTransport({
  host: MAILER_HOST,
  secureConnection: false, // TLS requires secureConnection to be false
  port: MAILER_PORT,
  requireTLS: true,
  auth: {
    user: MAILER_USERNAME,
    pass: MAILER_PASSWORD,
  },
});

// Send welcome email to a new user
const sendNewUserEmail = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: `The Literary Corner ${MAILER_USERNAME}`,
      to: toEmail,
      subject: "Welcome to The Literary Corner",
      html: `
        <div style="padding: 0 10%; margin: 0; box-sizing: border-box; height: 100%; width: 100%;">
            <div style="padding: 40px 0; height: 100%; background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);">
                <div style="width: 100%; height: 100%; padding: auto; background: transparent;">
                    <div style="width: 100%; height: 100%; padding: 0 19%; background: transparent; box-sizing: border-box;">
                        <h5 style="font-size: 14px; color: #1ec6ff; margin-bottom: 40px;">Hello ${name}</h5>
                        <h4 style="color: #1ec6ff; font-size: 18px; font-weight: Medium; letter-spacing: 2px; margin-bottom: 10px;">¡Welcome!</h4>
                        <h1 style="font-size: 45px; font-weight: bold; color: #1ec6ff; margin: 0 0 45px;">The Literary Corner</h1>
                        <p style="color: #1ec6ff; font-size: 15px; line-height: 1.9; margin-bottom: 40px;">You have just opened an account in bookstore, <br> you can now buy the books that you like the most</p>
                        <a style="display: inline-block; color: #1ec6ff; text-decoration: none; background: rgb(63, 76, 119); padding: 12px 30px; color: white; font-size: 14px; font-weight: bold; line-height: 1.4; border: 1px solid transparent; border-radius: 30px; cursor: pointer;" href=${MAILER_LINK_FRONT}/home>Watch Books</a>
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

// Send password change email to a user
const sendForgottenPassword = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: `The Literary Corner ${MAILER_USERNAME}`,
      to: toEmail,
      subject: "Forgot your password?",
      html: `
        <div style="padding: 0 10%; margin: 0; box-sizing: border-box; height: 100%; width: 100%;">
            <div style="padding: 40px 0; height: 100%; background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);">
                <div style="width: 100%; height: 100%; padding: auto; background: transparent;">
                    <div style="width: 100%; height: 100%; padding: 0 19%; background: transparent; box-sizing: border-box;">
                        <h5 style="font-size: 14px; color: #1ec6ff; margin-bottom: 40px;">Hello ${name}</h5>
                        <h4 style="color: #1ec6ff; font-size: 18px; font-weight: Medium; letter-spacing: 2px; margin-bottom: 10px;">We received a request to reset your The Literary Corner password.</h4>
                        <p style="color: #1ec6ff; font-size: 15px; line-height: 1.9; margin-bottom: 40px;">If you do not request the password change, <br> reject this email</p>
                        <h1 style="font-size: 45px; font-weight: bold; color: #1ec6ff; margin: 0 0 45px;">Click on the link below for continue with your password reset:</h1>
                        <a style="display: inline-block; color: #1ec6ff; text-decoration: none; background: rgb(63, 76, 119); padding: 12px 30px; color: white; font-size: 14px; font-weight: bold; line-height: 1.4; border: 1px solid transparent; border-radius: 30px; cursor: pointer;" href=${MAILER_LINK_FRONT}/login>Link to change your forgotten password</a>
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

// Send password change email to a user
const sendPasswordChange = async (toEmail, name, password) => {
  try {
    await transporter.sendMail({
      from: `The Literary Corner ${MAILER_USERNAME}`,
      to: toEmail,
      subject: "Change of password in The Literary Corner",
      html: `
        <div style="padding: 0 10%; margin: 0; box-sizing: border-box; height: 100%; width: 100%;">
            <div style="padding: 40px 0; height: 100%; background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);">
                <div style="width: 100%; height: 100%; padding: auto; background: transparent;">
                    <div style="width: 100%; height: 100%; padding: 0 19%; background: transparent; box-sizing: border-box;">
                        <h5 style="font-size: 14px; color: #1ec6ff; margin-bottom: 40px;">Hello ${name}</h5>
                        <h4 style="color: #1ec6ff; font-size: 18px; font-weight: Medium; letter-spacing: 2px; margin-bottom: 10px;">¡Important information!</h4>
                        
                        <p style="color: #1ec6ff; font-size: 15px; line-height: 1.9; margin-bottom: 40px;">Your password was successfully modified, <br> you can buy the books you like with your account</p> <br>
                        <h1 style="font-size: 45px; font-weight: bold; color: #1ec6ff; margin: 0 0 45px;">${password}</h1>
                        <a style="display: inline-block; color: #1ec6ff; text-decoration: none; background: rgb(63, 76, 119); padding: 12px 30px; color: white; font-size: 14px; font-weight: bold; line-height: 1.4; border: 1px solid transparent; border-radius: 30px; cursor: pointer;" href=${MAILER_LINK_FRONT}/login>Link to login with your new password</a>
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

// Send approved payment
const sendApprovedPayment = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: `The Literary Corner ${MAILER_USERNAME}`,
      to: toEmail,
      subject: "Welcome to The Literary Corner",
      html: `
        <div style="padding: 0 10%; margin: 0; box-sizing: border-box; height: 100%; width: 100%;">
            <div style="padding: 40px 0; height: 100%; background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);">
                <div style="width: 100%; height: 100%; padding: auto; background: transparent;">
                    <div style="width: 100%; height: 100%; padding: 0 19%; background: transparent; box-sizing: border-box;">
                        <h5 style="font-size: 14px; color: #1ec6ff; margin-bottom: 40px;">Hello ${name}</h5>
                        <h4 style="color: #1ec6ff; font-size: 18px; font-weight: Medium; letter-spacing: 2px; margin-bottom: 10px;">Your payment was approved, please try another payment method.</h4>
                        <h1 style="font-size: 45px; font-weight: bold; color: #1ec6ff; margin: 0 0 45px;">The Literary Corner</h1>
                        <p style="color: #1ec6ff; font-size: 15px; line-height: 1.9; margin-bottom: 40px;">You have just opened an account in bookstore, <br> you can now buy the books that you like the most</p>
                        <a style="display: inline-block; color: #1ec6ff; text-decoration: none; background: rgb(63, 76, 119); padding: 12px 30px; color: white; font-size: 14px; font-weight: bold; line-height: 1.4; border: 1px solid transparent; border-radius: 30px; cursor: pointer;" href="https://desarrolloweb.com/articulos/183.php" target="_blank">Watch Books</a>
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

// Send rejected payment
const sendRejectedPayment = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: `The Literary Corner ${MAILER_USERNAME}`,
      to: toEmail,
      subject: "Welcome to The Literary Corner",
      html: `
        <div style="padding: 0 10%; margin: 0; box-sizing: border-box; height: 100%; width: 100%;">
            <div style="padding: 40px 0; height: 100%; background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);">
                <div style="width: 100%; height: 100%; padding: auto; background: transparent;">
                    <div style="width: 100%; height: 100%; padding: 0 19%; background: transparent; box-sizing: border-box;">
                        <h5 style="font-size: 14px; color: #1ec6ff; margin-bottom: 40px;">Hello ${name}</h5>
                        <h4 style="color: #1ec6ff; font-size: 18px; font-weight: Medium; letter-spacing: 2px; margin-bottom: 10px;">Your payment was declined, please try another payment method.</h4>
                        <h1 style="font-size: 45px; font-weight: bold; color: #1ec6ff; margin: 0 0 45px;">The Literary Corner</h1>
                        <p style="color: #1ec6ff; font-size: 15px; line-height: 1.9; margin-bottom: 40px;">You have just opened an account in bookstore, <br> you can now buy the books that you like the most</p>
                        <a style="display: inline-block; color: #1ec6ff; text-decoration: none; background: rgb(63, 76, 119); padding: 12px 30px; color: white; font-size: 14px; font-weight: bold; line-height: 1.4; border: 1px solid transparent; border-radius: 30px; cursor: pointer;" href="https://desarrolloweb.com/articulos/183.php" target="_blank">Watch Books</a>
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
  sendForgottenPassword,
  sendPasswordChange,
  sendApprovedPayment,
  sendRejectedPayment,
};
