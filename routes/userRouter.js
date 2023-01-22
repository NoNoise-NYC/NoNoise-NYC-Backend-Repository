
const express = require("express");
const app = express()
const UserController = require("../controllers/userControllers.js");

const router = express.Router();

router.get("/login", UserController.getAllUsers);

router.get("/:id", UserController.getSingleUser);

router.get("/all", UserController.getAllUsersInfo);

router.post("/register",UserController.createUser)



module.exports = router;