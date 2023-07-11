const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexUsername = /^[A-Za-z0-9][A-Za-z0-9--\s]*$/;

const validationsForgotPassword = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Please, insert a email";
  } else if (!regexEmail.test(values.email)) {
    errors.email = "Format email invalid";
  }

  if (!values.securityQuestion) {
    errors.securityQuestion = "The security question is required";
  } else if (!regexUsername.test(values.securityQuestion)) {
    errors.securityQuestion =
      "The security question can only start with letters or numbers";
  } else if (
    values.securityQuestion.length < 6 ||
    values.securityQuestion.length > 30
  ) {
    errors.securityQuestion =
      "The security question must contain between 6 and 30 characters";
  }

  return errors;
};
export default validationsForgotPassword;
