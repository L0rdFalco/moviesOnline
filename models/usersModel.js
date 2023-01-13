const mongoose = require("mongoose")

const usersSchema = mongoose.Schema(
    {

    },
    {

    })

const usersModel = mongoose.model("User", usersSchema)

module.exports = usersModel