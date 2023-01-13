const express = require("express")
const authController = require("../controllers/authController.js")

const usersRouter = express.Router()

usersRouter.route("/signup").post(authController.signup)
usersRouter.route("/login").post(authController.login)

module.exports = usersRouter