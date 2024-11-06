const mongoose = require("mongoose");

// Schema
const catogerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Required"],
      unique: [true, "Category Must Be Unique"],
      minlength: [3, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    // A and B --->shoping/a-and-b
    slug: {
      type: String,
      lowercase: true,
      select:false
    },
    image: {
      type: String,
    },
  }, 
  { timestamps: true }
);

const catogeryModel = mongoose.model("catogery", catogerySchema);

module.exports = catogeryModel;
