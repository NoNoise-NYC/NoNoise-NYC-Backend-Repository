const express = require('express')
const userRouter = express.Router()
const usersController = require('../controllers/userControllers.js')

userRouter.get('/users', usersController.getAllUsers)
// username for user is stored in local storage on sign in
userRouter.get('/users/:id', usersController.getUsernameAndEmail)
userRouter.get('/login', usersController.loginAuthentication)

userRouter.post('/new_user', usersController.addUserInfo)

module.exports = userRouter
