const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category Must Be Unique"],
      minlength: [3, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
      select: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Category", categorySchema);
