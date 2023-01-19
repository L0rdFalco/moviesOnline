const axios = require("axios")


exports.apiCall = async function (route, params) {
    let queryParams = ""
    let currentUrl = ""
    if (params) {
        Object.keys(params).forEach(key => {
            if (params[key]) queryParams += `${key}=${params[key]}&`

        })
        currentUrl = `${process.env.movieDB_BASE_URL}${route}?${queryParams}`
    }

    else {
        currentUrl = `${process.env.movieDB_BASE_URL}${route}`
    }

    const res = await axios({
        url: currentUrl,
        method: "GET"
    })

    return res

}
