const slugify = require("slugify");
const mongoose = require("mongoose");
const productModel = require("../Models/productModel");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/AppError");

// Get all Products with pagination
exports.getProducts = catchAsync(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await productModel.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    results: products.length,
    page,
    data: products,
  });
});

// Get Specific Product By Id
exports.getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format

  const Product = await productModel.findById(id);
  if (!Product) {
    return next(new AppError(`No Product for this id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: Product,
  });
});

// Update Specific Product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(title);

  const Product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true, // Ensure validation rules are applied during update
  });

  if (!Product) {
    return next(new AppError(`No Product For This ID:${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: Product,
  });
});

// Delete Specific Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const Product = await productModel.findByIdAndDelete(id);

  if (!Product) {
    return next(new AppError(`No Product For This ID:${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: Product,
  });
});

// Create Product
exports.createProduct = catchAsync(async (req, res) => {
  req.body.slug = slugify(title);
  const Product = await productModel.create(req.body);

  res.status(201).json({
    status: "success",
    data: Product,
  });
});
