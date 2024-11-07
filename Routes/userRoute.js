const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteMe);

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;
