const express = require("express");
const subCategoryController = require("./../Controllers/subCategoryController");
const Vaildator = require("../Middleware/vaildatorMiddleware");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(subCategoryController.createSubCategory)
  .get(subCategoryController.getAllsubCategory);

router
  .route("/:id")
  .get(subCategoryController.getsubCategoryBYid)
  .patch(subCategoryController.updateSubCategory)
  .delete(subCategoryController.deleteSubCategory);

module.exports = router;
