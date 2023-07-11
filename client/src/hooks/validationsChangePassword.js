const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/;

const validationsChangePassword = (values) => {
  let errors = {};

  if (!values.newPassword) {
    errors.newPassword = "Please, insert a password";
  } else if (!regexPassword.test(values.newPassword)) {
    errors.newPassword =
      "Minimum eight and maximum 18 characters, at least one uppercase letter, one lowercase letter, one number, and one special character";
  } else if (values.currentPassword === values.newPassword) {
    errors.newPassword = "The new password cannot be the same as the current one";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please, insert a password";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Your passwords do not match, check the same";
  }

  return errors;
};
export default validationsChangePassword;
