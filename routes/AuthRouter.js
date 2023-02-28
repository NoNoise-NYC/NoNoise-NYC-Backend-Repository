const express = require("express");

const authController = require("../controllers/authController");
const router = express.Router();


router.post("/login", authController.validateLogin);

router.post("/login", authController.validateToken);

// router.get("/login", function(req, res){authController.validateLogin});

router.post("/new_user", function(req, res){authController.validateRegistration});

router.post("/authenticate", authController.authenticate);

router.post('/logout', function(req, res){authController.logOut});

module.exports = router;