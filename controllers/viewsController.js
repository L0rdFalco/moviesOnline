const api = require("../utils/api.js")

exports.getHomePage = async (request, response, next) => {
    try {

        /*
         * movies 
         * tv shows
         * xgenre list
         * search

        */

        let npMoviesInfo = await api.apiCall("/movie/now_playing")
        let topratedMovieInfo = await api.apiCall("/movie/top_rated")
        let popularTvInfo = await api.apiCall("/tv/popular")
        let genreListInfo = await api.apiCall("/genre/movie/list")

        npMoviesInfo = npMoviesInfo.data
        topratedMovieInfo = topratedMovieInfo.data
        popularTvInfo = popularTvInfo.data
        genreListInfo = genreListInfo.data


        response.status(200).render("home",
            {
                data: {
                    npMovies: npMoviesInfo.results,
                    trMovies: topratedMovieInfo.results,
                    tvShows: popularTvInfo.results,
                    genreList: genreListInfo.genres
                }
            })

    } catch (error) {
        console.log(error);
        response.status(400).json({ status: "getHomePage fail" })
    }
}

exports.getDetailPage = async (request, response, next) => {
    try {

        const movieDetails = await api.apiCall(`/movie/${request.params.movieid}`)


        console.log(movieDetails);

        response.status(200).render("detail", { data: movieDetails.data })

    } catch (error) {
        console.log(error);
        response.status(400).json({ status: "getDetailPage fail" })
    }
}

exports.getGenrePage = async (request, response, next) => {
    try {
        console.log(request.params);

        const genreList = await api.apiCall(`/discover/movie/`, request.params.genrename)

        console.log(genreList.data);


        response.status(200).render("similar", { data: genreList.data.results })

    } catch (error) {
        console.log(error);

        response.status(400).json({ status: "getGenrePage fail" })
    }
}

exports.getSimilarPage = async (request, response, next) => {
    try {
        console.log(request.params);

        const similiarDetails = await api.apiCall(`/movie/${request.params.movieid}/similar`)

        console.log(similiarDetails.data.results);


        response.status(200).render("similar", { data: similiarDetails.data.results })

    } catch (error) {

        console.log(error);
        response.status(400).json({ status: "getSimilarPage fail" })
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

