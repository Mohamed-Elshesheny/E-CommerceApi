const express = require("express");
const subCategoryController = require("./../Controllers/subCategoryController");
const { validateId } = require("../Middleware/vaildatorMiddleware");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(subCategoryController.createSubCategory)
  .get(subCategoryController.getAllsubCategory);

router
  .route("/:id")
  .get(validateId, subCategoryController.getsubCategoryBYid)
  .patch(validateId, subCategoryController.updateSubCategory)
  .delete(validateId, subCategoryController.deleteSubCategory);

module.exports = router;
