const mongoose = require("mongoose")
const validator = require("validator")

const usersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, " user must have a name"]
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, " user must hava an email address"],
            validate: [validator.isEmail, "please provide a valid email address for  user"]
        },
    },
    {
        //allows virtual fields to show up in responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const usersModel = mongoose.model("User", usersSchema)

module.exports = usersModel