const slugify = require("slugify");
const mongoose = require("mongoose");
const categoryModel = require("./../Models/categoryModel");
const catchAsync = require("express-async-handler");
const AppError = require("./../utils/AppError");

// Get all categories with pagination
exports.getCategories = catchAsync(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categoreis = await categoryModel.find().skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    results: categoreis.length,
    page,
    data: categoreis,
  });
});

// Get Specific Category By Id
exports.getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Validate ObjectId format

  const category = await categoryModel.findById(id);
  if (!category) {
    return next(new AppError(`No category for this id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
});

// Update Specific Category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true, // Ensure validation rules are applied during update
  });

  if (!category) {
    return next(new AppError(`No Category For This ID:${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
});

// Delete Specific Category
exports.deletCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new AppError(`No Category For This ID:${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: category,
  });
});

// Create Category
exports.createCategory = catchAsync(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });

  res.status(201).json({
    status: "success",
    data: category,
  });
});
