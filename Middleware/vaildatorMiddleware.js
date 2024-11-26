const { param, validationResult } = require("express-validator");

// Reusable error-handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// Validate ID for routes with :id parameter
const validateId = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateId,
};