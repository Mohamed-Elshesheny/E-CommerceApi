const slugify = require("slugify");
const mongoose = require("mongoose");
const brandModel = require("../Models/brandModel");
const catchAsync = require("express-async-handler");
const AppError = require("../utils/AppError");

// Get all Brands with pagination
exports.getBrands = catchAsync(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await brandModel.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    results: brands.length,
    page,
    data: brands,
  });
});

// Get Specific Brand By ID
exports.getBrandById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new AppError(`No brand found for ID: ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: brand,
  });
});

// Update Specific Brand
exports.updateBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true, // Ensure validation rules are applied during update
  });

  if (!brand) {
    return next(new AppError(`No brand found for ID: ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: brand,
  });
});

// Delete Specific Brand
exports.deleteBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new AppError(`No brand found for ID: ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    message: `Brand with ID: ${id} has been successfully deleted.`
  });
});

// Create Brand
exports.createBrand = catchAsync(async (req, res) => {
  const name = req.body.name;
  const brand = await brandModel.create({ name, slug: slugify(name) });

  res.status(201).json({
    status: "success",
    data: brand,
  });
});