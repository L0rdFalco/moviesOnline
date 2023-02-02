const usersModel = require("../models/usersModel.js")

exports.createNewUser = async (request, response, next) => {
    try {

        const userExists = await usersModel.findOne({ email: request.body.email })

        if (userExists) return response.status(200).json({ status: "success" })

        const newUser = await usersModel.create({
            name: request.body.name,
            email: request.body.email
        })

        if (newUser) response.status(200).json({ status: "createNewUser success" })
        else response.status(200).json({ status: "createNewUser fail" })

    } catch (error) {
        console.log("somehing went wrong");
        response.status(400).json({ status: "createNewUser fail" })

    }
}