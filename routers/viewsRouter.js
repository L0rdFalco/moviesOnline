const express = require("express")
const authController = require("../controllers/authController.js")
const viewsController = require("../controllers/viewsController.js")

const viewsRouter = express.Router()

viewsRouter.route("/").get(viewsController.getHomePage)
viewsRouter.route("/auth").get(viewsController.getAuthWall)
viewsRouter.route("/watch/:moviename").get(viewsController.getDetailPage)
viewsRouter.route("/dashboard").get(viewsController.getDashboard)



module.exports = viewsRouter