const regexImage = /^data:image\/(jpg|jpeg|png|gif);base64,/;

//It can only start with letters and can use commas, periods, and semicolons.
const regexStartsWithLetterAndPunctuation = /^[A-Za-z][A-Za-z\s,.;-]*$/;

//Validation of letters, numbers, commas, periods and double periods. Can only start with letters or numbers
const regexString = /^[A-Za-z0-9,.:-\s]*$/;

//Can only start with letters or numbers
const regexOnlyStringNumber = /^[A-Za-z0-9][A-Za-z0-9\s\S]*$/;

//Can only start with letters or numbers and contain -
const regexUsername = /^[A-Za-z0-9][A-Za-z0-9--\s]*$/;

//Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{0,}$/;

//Telephone numbers in the format +xx-xxx-xxx-xxxx
const regexPhone = /^\+\d{2}-\d{3}-\d{3}-\d{4}$/;

//Can only contain letters
const regexOnlyLetter = /^[A-Za-z\s]+$/;

const isEmptyBoolean = (value) => !value || typeof value === "boolean" || false;

const isEmptyImageFile = (value) => {
  if (regexImage.test(value)) {
    return true;
  }
};

const isEmptyField = (value) => {  
  if (value.trim()) {
    return true;
  }
};

const isStartsWithLetter = (value) => {
  if (regexStartsWithLetterAndPunctuation.test(value)) {
    return true;
  }
};

const isStringNumberStartValidate = (value) => {
  if (regexOnlyStringNumber.test(value)) {
    return true;
  }
};

const isStringValidate = (value) => {
  if (regexString.test(value)) {
    return true;
  }
};

const isStringOnlyLetter = (value) => {
  if (regexOnlyLetter.test(value)) {
    return true;
  }
};

const isUsernameValidate = (value) => {
  if (regexUsername.test(value)) {
    return true;
  }
};

const isPasswordValidate = (value) => {
  if (value.length >= 8) {
    regexPassword.test(value);
    return true;
  }
};

const isPhoneValidate = (value) => {
  if (regexPhone.test(value)) {
    return true;
  }
};

module.exports = {
  isEmptyBoolean,
  isEmptyImageFile,
  isEmptyField,
  isStartsWithLetter,
  isStringNumberStartValidate,
  isStringValidate,
  isStringOnlyLetter,
  isUsernameValidate,
  isPasswordValidate,
  isPhoneValidate,
};
