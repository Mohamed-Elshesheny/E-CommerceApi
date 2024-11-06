const { check, validationResult } = require("express-validator");

// Reusable error-handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.validateId = [
  check("id").isMongoId().withMessage("Invalid Category ID"),
  handleValidationErrors,
];

exports.validateCreateCategory = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name is too short (minimum is 3 characters)")
    .isLength({ max: 32 })
    .withMessage("Category name is too long (maximum is 32 characters)"),
  handleValidationErrors,
];