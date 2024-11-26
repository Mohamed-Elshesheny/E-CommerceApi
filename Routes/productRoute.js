const express = require("express");
const productController = require("../Controllers/productController");
const Validator = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

// // Nested route for subcategories
// router.use("/:productID/subcategories", subCategoriesRoute);

// product routes
router
  .route("/")
  .get(productController.getProducts)
  .post(
    Validator.dynamicValidation("name", [
      { type: "notEmpty" },
      { type: "isLength", options: { min: 3, max: 32 } },
    ]),
    productController.createProduct
  );

router
  .route("/:id")
  .get(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    productController.getProductById
  )
  .put(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    productController.updateProduct
  )
  .delete(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    productController.deleteProduct
  );

module.exports = router;
