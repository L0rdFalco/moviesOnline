const express = require("express")
const authController = require("../controllers/authController.js")
const viewsController = require("../controllers/viewsController.js")

const viewsRouter = express.Router()

viewsRouter.route("/").get(viewsController.getHomePage)
viewsRouter.route("/detail/:moviename").get(viewsController.getDetailPage)
viewsRouter.route("/genre/:genrename").get(viewsController.getGenrePage)// romance, thriller, documentary etc
viewsRouter.route("/type/:typename").get(viewsController.getTypePage)// movie, tv show or web series
viewsRouter.route("/results/:searchvalue").get(viewsController.getResultsPage)// movie, tv show or web series
viewsRouter.route("/auth").get(viewsController.getAuthWall)
viewsRouter.route("/dashboard").get(viewsController.getDashboard)


module.exports = viewsRouter