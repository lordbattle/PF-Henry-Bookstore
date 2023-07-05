const validationStructure = (validationType, errorMessage, customFunction) => {
  if (!customFunction) {
    return {
      [validationType]: { errorMessage },
    };
  }

  return {
    [validationType]: {
      options:
        typeof customFunction === "function"
          ? (value) => customFunction(value)
          : customFunction,
      errorMessage,
    },
  };
};

const generateStructureByKey = (validations) => {
  return validations.reduce(
    (acc, cur) => ({ ...acc, ...validationStructure(...cur) }),
    {}
  );
};

module.exports = {
  validationStructure,
  generateStructureByKey,
};
