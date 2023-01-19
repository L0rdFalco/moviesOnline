const express = require("express")
const storyController = require("../controllers/storyController.js")

const storyRouter = express.Router()

storyRouter.route("/:searchValue").get(storyController.getResults)

module.exports = storyRouter