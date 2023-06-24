const regexImage = /^data:image(\/jpg|\/jpeg|\/png|\/gif)/i;

const isEmptyBoolean = (value) => !value || typeof value === "boolean" || false;

const isEmptyImageFile = (value) => {
  if (!value) return true;

  return regexImage.test(value);
};

module.exports = {
  isEmptyBoolean,
  isEmptyImageFile,
};
