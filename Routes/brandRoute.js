const express = require("express");
const brandController = require("../Controllers/brandController");
const Validator = require("../Middleware/vaildatorMiddleware");

const router = express.Router();

router
  .route("/")
  .get(brandController.getBrands)
  .post(
    Validator.dynamicValidation("name", [
      { type: "notEmpty" },
      { type: "isLength", options: { min: 3, max: 32 } },
    ]),
    brandController.createBrand
  );

router
  .route("/:id")
  .get(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    brandController.getBrandById
  )
  .put(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    brandController.updateBrand
  )
  .delete(
    Validator.dynamicValidation("id", [{ type: "isMongoId" }]),
    brandController.deleteBrand
  );

module.exports = router;
