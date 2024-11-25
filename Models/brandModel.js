const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand Required"],
      unique: [true, "brand Must Be Unique"],
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

module.exports = mongoose.model("brand", brandSchema);
