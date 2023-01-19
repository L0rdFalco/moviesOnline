const express = require("express")
const authController = require("../controllers/authController.js")
const viewsController = require("../controllers/viewsController.js")

const viewsRouter = express.Router()

viewsRouter.route("/").get(viewsController.getHomePage)
viewsRouter.route("/detail/:movieid").get(viewsController.getDetailPage)
viewsRouter.route("/genre/:genrename").get(viewsController.getGenrePage)
viewsRouter.route("/similar/:movieid").get(viewsController.getSimilarPage)
viewsRouter.route("/type/:typename").get(viewsController.getTypePage)// movie, tv show or web series
viewsRouter.route("/results/:searchvalue").get(viewsController.getSearchResultsPage)// movie, tv show or web series
viewsRouter.route("/auth").get(viewsController.getAuthWall)
viewsRouter.route("/dashboard").get(viewsController.getDashboard)
viewsRouter.route("/pricing").get(viewsController.getPricingPage)


module.exports = viewsRouter