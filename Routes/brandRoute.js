const express = require("express");
const brandController = require("../Controllers/brandController");
const {validateId} = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

router
  .route("/")
  .get(brandController.getBrands)
  .post(brandController.createBrand);

router
  .route("/:id")
  .get(validateId, brandController.getBrandById)
  .put(validateId, brandController.updateBrand)
  .delete(validateId, brandController.deleteBrand);

module.exports = router;
