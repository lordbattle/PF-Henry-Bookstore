const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexNameAndLastName = /^[a-zA-ZÀ-ÿ\s]{1,30}$/;
//validation of letters, numbers, commas, periods, double periods, semicolons, slashes and asterisks. It can only start with letters and numbers.
const regexStringandSpecialCharacters = /^[A-Za-z0-9][A-Za-z0-9,.:;-\s\/\*]*$/;

const validationsContactForm = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Please, insert a name";
  } else if (!regexNameAndLastName.test(values.name)) {
    if (values.name.length > 30) {
      errors.name = "The name cannot be longer than 30";
    } else {
      errors.name = "The name can only have letters and spaces ";
    }
  }

  if (!values.email) {
    errors.email = "Please, insert a email";
  } else if (!regexEmail.test(values.email)) {
    errors.email = "Format email invalid";
  }

  if (!values.affair) {
    errors.affair = "Please, insert a affair";
  } else if (values.affair.length < 10) {
    errors.affair = "The affair must have at least 10 characters";
  } else if (!regexNameAndLastName.test(values.affair)) {
    if (values.affair.length > 35) {
      errors.affair = "The affair cannot be longer than 35 characters";
    } else {
      errors.affair = "The affair can only have letters and spaces ";
    }
  }

  if (!values.message) {
    errors.message = "Please, insert a message";
  } else if (values.message.length < 20) {
    errors.message = "The message must have at least 20 characters";
  } else if (!regexStringandSpecialCharacters.test(values.message)) {
    if (values.message.length > 500) {
      errors.message = "The message cannot be longer than 500 characters";
    } else {
      errors.message = "The affair can only have letters, numbers, commas, periods, double periods, semicolons, slashes and asterisks. It can only start with letters and numbers.";
    }
  }

  return errors;
};
export default validationsContactForm;
