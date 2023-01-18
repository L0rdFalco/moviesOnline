const api = require("../utils/api.js")
const https = require("https")

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

        let params = {
            pageNum: request.params.pagenum
        }

        const genreList = await api.apiCall(`/discover/movie/`, request.params.genrename)

        console.log(genreList.data);


        response.status(200).render("results", {
            data: genreList.data.results,
            paginate: false
        })

    } catch (error) {
        console.log(error);

        response.status(400).json({ status: "getGenrePage fail" })
    }
}

exports.getSimilarPage = async (request, response, next) => {
    try {
        console.log(request.params);
        console.log(request.query);

        const similiarDetails = await api.apiCall(`/movie/${request.params.movieid}/similar`)

        console.log(similiarDetails.data.results);


        response.status(200).render("results",
            {
                data: similiarDetails.data.results,
                paginate: false
            })

    } catch (error) {

        console.log(error);
        response.status(400).json({ status: "getSimilarPage fail" })
    }
}

exports.getTypePage = async (request, response, next) => {
    try {
        console.log(request.params);
        console.log(request.query);

        let value = null

        if (request.params.typename === "movies") {
            value = "/movie/popular"

        }
        else if (request.params.typename === "tv-shows") {
            value = "/tv/popular"

        }

        /**
         * https://api.themoviedb.org/3/discover/movie?api_key=44898f033c1064ee9e60d512e396cfcd&page=443&sort_by=release_date.desc
         * https://api.themoviedb.org/3/movie/top_rated?api_key=44898f033c1064ee9e60d512e396cfcd&page=91
         * https://api.themoviedb.org/3/movie/popular?api_key=44898f033c1064ee9e60d512e396cfcd&page=499
         *  */

        console.log(value);
        const mediaDetails = await api.apiCall(value)

        // console.log(mediaDetails);

        response.status(200).render("results",
            {
                paginate: true,
                page: request.query.page,
                num: 10,
                typeVal: request.params.typename,
                data: mediaDetails.data.results

            })

    } catch (error) {
        // console.log(error);
        response.status(400).json({ status: "getTypePage fail" })
    }
}

exports.getSearchResultsPage = (request, response, next) => {
    try {

        console.log(request.params);
        console.log(request.query);

        const searchVal = request.params.searchvalue

        // https.get(`https://myflixer.pw/search/${searchVal}`, function (res) {
        //     console.log(res.statusCode);
        //     res.setEncoding('utf8');
        //     res.on('data', function (data) {
        //         console.log(data);
        //     });
        // }).on('error', function (err) {
        //     console.log(err);
        // });



        response.status(200).render("results",
            {
                data: {
                    paginate: false,
                    movieData: {}

                }
            }
        )

    } catch (error) {
        console.log(error);
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

