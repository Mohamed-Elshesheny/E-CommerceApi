// const { check, validationResult } = require("express-validator");

// // Reusable error-handling middleware
// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// exports.validateId = [
//   check("id").isMongoId().withMessage("Invalid Category ID"),
//   handleValidationErrors,
// ];

// exports.validateCreateCategory = [
//   check("name")
//     .notEmpty()
//     .withMessage("Category name is required")
//     .isLength({ min: 3 })
//     .withMessage("Category name is too short (minimum is 3 characters)")
//     .isLength({ max: 32 })
//     .withMessage("Category name is too long (maximum is 32 characters)"),
//   handleValidationErrors,
// ];
// const { check, validationResult } = require("express-validator");

// // Reusable error-handling middleware
// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Modify error messages to include dynamic data
//     const dynamicErrors = errors.array().map((error) => {
//       // Replace 'Category' with the dynamic field name or value
//       const fieldName = error.param; // Field being validated
//       const inputValue = req.body[fieldName] || ""; // Input value for the field
//       const updatedMsg = error.msg.replace(
//         "Category",
//         fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//       );
//       return { ...error, msg: updatedMsg, value: inputValue };
//     });
//     return res.status(400).json({ errors: dynamicErrors });
//   }
//   next();
// };

// exports.validateId = [
//   check("id").isMongoId().withMessage("Invalid Category ID"), // This will dynamically change 'Category' to 'Id'
//   handleValidationErrors,
// ];

// exports.validateCreateCategory = [
//   check("name")
//     .notEmpty()
//     .withMessage("Category name is required") // Will replace 'Category' with 'Name'
//     .isLength({ min: 3 })
//     .withMessage("Category name is too short (minimum is 3 characters)") // Replace dynamically
//     .isLength({ max: 32 })
//     .withMessage("Category name is too long (maximum is 32 characters)"), // Replace dynamically
//   handleValidationErrors,
// ];

const { check, validationResult } = require("express-validator");

// Reusable error-handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const dynamicErrors = errors.array().map((error) => {
      const fieldName = error.param;
      const inputValue = req.body[fieldName] || "";
      const updatedMsg = error.msg.replace(/Category|Field|Property/);
      return { ...error, msg: updatedMsg, value: inputValue };
    });
    return res.status(400).json({ errors: dynamicErrors });
  }
  next();
};

// Dynamic validation function
exports.dynamicValidation = (field, rules) => {
  const validations = rules.map((rule) => {
    switch (rule.type) {
      case "notEmpty":
        return check(field).notEmpty().withMessage(`${field} is required`);
      case "isLength":
        return check(field)
          .isLength(rule.options)
          .withMessage(
            `${field} must be between ${rule.options.min} and ${rule.options.max} characters`
          );
      case "isMongoId":
        return check(field).isMongoId().withMessage(`Invalid ${field}`);
      default:
        throw new Error(`Validation rule ${rule.type} is not supported`);
    }
  });
  return [...validations, handleValidationErrors];
};
