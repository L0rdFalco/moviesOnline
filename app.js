const express = require("express")
const path = require("path")
const morgan = require("morgan")
const usersRouter = require("./routers/usersRouter.js")
const viewsRouter = require("./routers/viewsRouter.js")


const app = express()

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))


//global middleware for serving up static files from public folder
app.use(express.static(path.join(__dirname, "public")))

//glonal middlware for logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"))

app.use("/", viewsRouter)
app.use("/users/", usersRouter)

module.exports = app