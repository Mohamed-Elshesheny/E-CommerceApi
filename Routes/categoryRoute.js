// const express = require("express");
// const categoryController = require("./../Controllers/categoryController");
// const subCategoriesRoute = require("./../Routes/subCategoryRoute");
// const Vaildator = require("../Middleware/vaildatorMiddleware");

// const router = express.Router();

// router.use("/:categoryID/subcategories", subCategoriesRoute);

// router
//   .route("/")
//   .get(categoryController.getCategories)
//   .post(Vaildator.validateCreateCategory, categoryController.createCategory);

// router
//   .route("/:id")
//   .get(Vaildator.validateId, categoryController.getCategoryById)
//   .put(Vaildator.validateId, categoryController.updateCategory)
//   .delete(Vaildator.validateId, categoryController.deletCategory);

// module.exports = router;
const express = require("express");
const categoryController = require("../Controllers/categoryController");
const subCategoriesRoute = require("../Routes/subCategoryRoute");
const Validator = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

// Nested route for subcategories
router.use("/:categoryID/subcategories", subCategoriesRoute);

// Category routes
router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    Validator.dynamicValidation("name", [
      { type: "notEmpty" },
      { type: "isLength", options: { min: 3, max: 32 } },
    ]),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    categoryController.getCategoryById
  )
  .put(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    categoryController.updateCategory
  )
  .delete(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    categoryController.deleteCategory
  );

module.exports = router;
