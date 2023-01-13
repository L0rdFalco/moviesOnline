exports.getHomePage = (request, response, next) => {
    try {

        response.status(200).render("home")

    } catch (error) {
        response.status(400).json({ status: "getHomePage fail" })
    }
}

exports.getDetailPage = (request, response, next) => {
    try {
        response.status(200).render("detail")

    } catch (error) {
        response.status(400).json({ status: "getDetailPage fail" })
    }
}


exports.getDashboard = (request, response, next) => {
    try {
        response.status(200).render("dashboard")

    } catch (error) {
        response.status(400).json({ status: "getDashboard fail" })
    }
}

exports.getAuthWall = (request, response, next) => {
    try {
        response.status(200).render("auth-wall")

    } catch (error) {
        response.status(400).json({ status: "getAuthWall fail" })
    }
}

