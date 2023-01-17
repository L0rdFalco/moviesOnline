const axios = require("axios")

exports.apiCall = async function (identifier, params) {
    const res = await axios({
        url: `${process.env.movieDB_BASE_URL}${identifier}?api_key=${process.env.movieDB_API_KEY}&${params}`,
        method: "GET"
    })

    return res

}