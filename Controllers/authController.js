const User = require("./../Models/userModel");
const catchAsync = require("express-async-handler");
const mongoose = require("mongoose");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});