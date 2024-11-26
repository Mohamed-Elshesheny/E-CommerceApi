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
const { validateId } = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

// Nested route for subcategories
router.use("/:categoryID/subcategories", subCategoriesRoute);

// Category routes
router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(validateId, categoryController.getCategoryById)
  .put(validateId, categoryController.updateCategory)
  .delete(validateId, categoryController.deleteCategory);

module.exports = router;
