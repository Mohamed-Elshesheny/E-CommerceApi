const { body } = require("express-validator");
const handleValidationErrors = require("../Middleware/vaildatorMiddleware");

const validateProduct = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string")
    .toLowerCase(),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("priceAfterDiscount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price after discount must be a positive number")
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error(
          "Price after discount must be less than the original price"
        );
      }
      return true;
    }),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Category must be a valid MongoDB ObjectId"),
  body("subcategory")
    .notEmpty()
    .withMessage("Subcategory is required")
    .isMongoId()
    .withMessage("Subcategory must be a valid MongoDB ObjectId"),
  body("brand")
    .notEmpty()
    .withMessage("Brand is required")
    .isMongoId()
    .withMessage("Brand must be a valid MongoDB ObjectId"),
  body("ratingAverage")
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("ratingsCount")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Ratings count must be a non-negative integer"),
  handleValidationErrors,
  
];


module.exports =  validateProduct ;
