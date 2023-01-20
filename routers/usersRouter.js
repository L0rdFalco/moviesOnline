const express = require("express")
const authController = require("../controllers/authController.js")
const usersController = require("../controllers/usersController.js")

const usersRouter = express.Router()

usersRouter.route("/signup").post(authController.signup)
usersRouter.route("/login").post(authController.login)
usersRouter.route("/register").post(usersController.createNewUser)

module.exports = usersRouter