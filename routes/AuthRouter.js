const express = require("express");

const authController = require("../controllers/authController");
const router = express.Router();


router.post("/new_user", authController.validateLogin);

router.get("/:email/:password'", authController.validateLogin);

router.post("/new_user", authController.validateRegistration);

router.post("/new_user", authController.authenticate);

router.post('/logout', authController.logOut);

module.exports = router;