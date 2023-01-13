exports.protect = (request, response, next) => {

    try {

    } catch (error) {
        response.status(400).json({ status: "protect fail" })
    }

}

exports.restrictTo = (request, response, next) => {

    try {

    } catch (error) {
        response.status(400).json({ status: "restrictTo fail" })
    }

}


exports.isLoggedIn = (request, response, next) => {

    try {

    } catch (error) {
        response.status(400).json({ status: "isLoggedIn fail" })
    }

}

exports.login = (request, response, next) => {

    try {

    } catch (error) {
        response.status(400).json({ status: "login fail" })
    }

}

exports.signup = (request, response, next) => {

    try {

    } catch (error) {
        response.status(400).json({ status: "signup fail" })
    }

}

