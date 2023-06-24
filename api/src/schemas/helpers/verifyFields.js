const regexImage = /^data:image(\/jpg|\/jpeg|\/png|\/gif)/i;

//Validation of letters, numbers, commas, period and double period.
const regexString = /^[A-Za-z0-9,.:]*$/;

const isEmptyBoolean = (value) => !value || typeof value === "boolean" || false;

const isEmptyImageFile = (value) => {
  if (regexImage.test(value)) return false;
};

const isStringValidate = (value) => {
  if (regex.test(texto)) {
    return true;
  }
  return regexString.test(value);
};

module.exports = {
  isEmptyBoolean,
  isEmptyImageFile,
  isStringValidate
};
