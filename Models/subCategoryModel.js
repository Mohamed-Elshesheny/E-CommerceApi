const mongoose = require("mongoose");
const validator = require("validator");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Subcategory must be unique"],
      minlength: [2, "Too short subcategory name"],
      maxlength: [32, "Too long subcategory name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category", // Ensure this is the correct model name
      required: [true, "Subcategory must belong to a parent category"],
      validate: {
        validator: async function (value) {
          // Check if `value` is a valid ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return false;
          }

          // Check if the category exists in the Category collection
          const categoryExists = await mongoose
            .model("Category")
            .exists({ _id: value });
          return categoryExists !== null;
        },
        message: "Parent category does not exist or invalid category ID",
      },
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
