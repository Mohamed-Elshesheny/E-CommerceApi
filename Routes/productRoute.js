const express = require("express");
const productController = require("../Controllers/productController");
const validateProduct = require("../Validators/productValidator");
const { validateId } = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

// // Nested route for subcategories
// router.use("/:productID/subcategories", subCategoriesRoute);

// product routes
router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(validateId, productController.getProductById)
  .put(validateId, productController.updateProduct)
  .delete(validateId, productController.deleteProduct);

module.exports = router;
