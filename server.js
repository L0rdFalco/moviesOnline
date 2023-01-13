const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

const app = require("./app.js")

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("movies db connected!");
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`movies listening on port ${port}`);
})


