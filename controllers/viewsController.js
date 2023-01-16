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


exports.getGenrePage = (request, response, next) => {
    try {
        response.status(200).render("genre")

    } catch (error) {
        response.status(400).json({ status: "getGenrePage fail" })
    }
}

exports.getTypePage = (request, response, next) => {
    try {
        response.status(200).render("type")

    } catch (error) {
        response.status(400).json({ status: "getTypePage fail" })
    }
}

exports.getResultsPage = (request, response, next) => {
    try {
        response.status(200).render("results")

    } catch (error) {
        response.status(400).json({ status: "getResultsPage fail" })
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

