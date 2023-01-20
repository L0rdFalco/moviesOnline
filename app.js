const express = require("express")
const path = require("path")
const morgan = require("morgan")
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
const usersRouter = require("./routers/usersRouter.js")
const storyRouter = require("./routers/storyRouter.js")
const viewsRouter = require("./routers/viewsRouter.js")


const app = express()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))


//global middleware for serving up static files from public folder
app.use(express.static(path.join(__dirname, "public")))

//global middleware for appending body data to request object
// also called body parser
app.use(express.json({
    limit: "300kb"
}))

//global middleware for data sanitization against nosql query injection
app.use(mongoSanitize())

//glonal middlware for logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

app.use("/", viewsRouter)
app.use("/users/", usersRouter)
app.use("/stories/", storyRouter)

module.exports = app