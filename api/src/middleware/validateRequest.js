const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  console.log("validate body",req.body);
  
  const errors = validationResult(req);
  console.log('empieza errores',errors, 'errors validaterequest')


  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validateRequest,
};
