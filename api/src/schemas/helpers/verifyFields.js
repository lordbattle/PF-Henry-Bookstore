const regexImage = /^data:image\/(jpg|jpeg|png|gif);base64,/;

//It can only start with letters and can use commas, periods, and semicolons.
const regexStartsWithLetterAndPunctuation = /^[A-Za-z][A-Za-z\s,.;-]*$/;

//Validation of letters, numbers, commas, periods and double periods. Can only start with letters or numbers
const regexString = /^[A-Za-z0-9,.:-\s]*$/;

//Can only start with letters or numbers
const regexOnlyStringNumber = /^[A-Za-z0-9][A-Za-z0-9\s\S]*$/;

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

module.exports = {
  isEmptyBoolean,
  isEmptyImageFile,
  isEmptyField,
  isStartsWithLetter,
  isStringNumberStartValidate,
  isStringValidate,
};
