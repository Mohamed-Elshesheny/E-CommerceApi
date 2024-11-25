const catchAsync = require("express-async-handler");
const AppError = require("./../utils/AppError");
const subCategoryModel = require("../Models/subCategoryModel");

exports.createSubCategory = catchAsync(async (req, res, next) => {
  // Nested Route
  if (!req.body.category) req.body.category = req.params.categoryID;

  const { name, category } = req.body;
  if (!category) {
    return next(
      new AppError("Subcategory must belong to a parent category", 400)
    );
  }

  const subCategory = await subCategoryModel.create({ name, category });
  res.status(201).json({
    status: "success",
    data: subCategory,
  });
});

exports.getAllsubCategory = catchAsync(async (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryID) filterObj = { category: req.params.categoryID };

  const subCategories = await subCategoryModel
    .find(filterObj)
    .populate({ path: "category", select: "name _id" });
  if (!subCategories) {
    return next(new AppError("There is not subCategory", 404));
  }
  res.status(200).json({
    status: "success",
    results: subCategories.length,
    data: subCategories,
  });
});

exports.getsubCategoryBYid = catchAsync(async (req, res, next) => {
  const subCategory = await subCategoryModel
    .findById(req.params.id)
    .populate({ path: "category", select: "name _id" });
  if (!subCategory) {
    return next(
      new AppError(
        `There is not a subCategory with this ID ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    data: subCategory,
  });
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: updatedCategory,
  });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
  await subCategoryModel.findByIdAndDelete(req.params.id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

