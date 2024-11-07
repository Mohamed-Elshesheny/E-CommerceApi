const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;
