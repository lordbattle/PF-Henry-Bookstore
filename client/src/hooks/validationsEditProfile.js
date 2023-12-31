const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexUsername = /^[A-Za-z0-9][A-Za-z0-9--\s]*$/;
const regexNameAndLastName = /^[a-zA-ZÀ-ÿ\s]{1,25}$/;
const regexLocation = /^[a-zA-ZÀ-ÿ\s]{1,25}$/;
const regexPhone = /^\+\d{2}-\d{3}-\d{3}-\d{4}$/;

const validationsEditProfile = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Please, insert a name";
  } else if (!regexNameAndLastName.test(values.name)) {
    if (values.name.length > 25) {
      errors.name = "The name cannot be longer than 25";
    } else {
      errors.name = "The name can only have letters and spaces ";
    }
  }

  if (!values.lastName) {
    errors.lastName = "Please, insert a lastName";
  } else if (!regexNameAndLastName.test(values.lastName)) {
    if (values.lastName.length > 25) {
      errors.lastName = "The lastName cannot be longer than 25";
    } else {
      errors.lastName = "The LastName can only have letters and spaces";
    }
  }

  if (!values.email) {
    errors.email = "Please, insert a email";
  } else if (!regexEmail.test(values.email)) {
    errors.email = "Format email invalid";
  }

  if (!values.userName) {
    errors.userName = "The username is required";
  } else if (!regexUsername.test(values.userName)) {
    errors.userName = "The username can only start with letters or numbers";
  } else if (values.userName.length < 8 || values.userName.length > 20) {
    errors.userName = "Username must contain between 8 and 20 characters";
  }

  if (!values.location) {
    errors.location = "Please, insert a location";
  } else if (
    !regexLocation.test(values.location) ||
    values.location.length > 15
  ) {
    if (values.location.length > 10) {
      errors.location = "The name cannot be longer than 15";
    } else {
      errors.location = "The name can only have letters and spaces ";
    }
  }

  if (!values.age) {
    values.age = 18;
  } else if (parseInt(values.age)) {
    const ageNum = +values.age;
    if (ageNum % 1 !== 0) {
      errors.age = "The age cannot be decimal";
    } else {
      if (ageNum >= 90 || ageNum <= 17) {
        errors.age = "The age must be between 18 and 90";
      }
    }
  } else {
    errors.age = "The age must be a number";
  }

  if (!values.genres) {
    values.genres = "not specified";
  }

  if (!values.phone) {
    values.phone = "+00-000-000-0000";
  } else if (!regexPhone.test(values.phone)) {
    errors.phone = "Invalid phone format";
  }

  return errors;
};
export default validationsEditProfile;
