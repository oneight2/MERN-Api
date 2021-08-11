const express = require("express");
const router = express.Router();
// IMPORT CONTROLLER PRODUCT
const authController = require("../controller/auth");

// CREATE
router.post("/register", authController.register);

module.exports = router;
