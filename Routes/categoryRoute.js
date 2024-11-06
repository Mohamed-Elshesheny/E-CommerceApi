const express = require("express");
const categoryController = require("./../Controllers/categoryController");
const Vaildator = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(Vaildator.validateCreateCategory, categoryController.createCategory);

router
  .route("/:id")
  .get(Vaildator.validateId, categoryController.getCategoryById)
  .put(Vaildator.validateId, categoryController.updateCategory)
  .delete(Vaildator.validateId, categoryController.deletCategory);

module.exports = router;
