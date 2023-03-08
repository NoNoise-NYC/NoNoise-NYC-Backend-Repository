const express = require("express");

const authController = require("../controllers/authController");
const router = express.Router();


router.post("/login", authController.validateLogin);

router.post("/authuser", authController.validateRegistration);

router.post("/authenticate", authController.authenticate);

module.exports = router;