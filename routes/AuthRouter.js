const express = require("express");

const authController = require("../controllers/authController");
const router = express.Router();


router.post("/login", authController.validateLogin);

router.get("/login", authController.validateLogin);

router.post("/register", authController.validateRegistration);

router.post("/authenticate", authController.authenticate);

router.post('/logout', authController.logOut);

module.exports = router;