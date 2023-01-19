const api = require("../utils/api.js")
const https = require("https")
const nodeparser = require("node-html-parser")
const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got')

exports.getHomePage = async (request, response, next) => {
    try {

        /*
         * movies 
         * tv shows
         * xgenre list
         * search

        */
        let params = {
            api_key: process.env.movieDB_API_KEY,
            sort_by: "release_date.desc",
            page: request.query.page
        }
        const npMoviesInfo = await api.apiCall("/movie/now_playing", params)
        const topratedMovieInfo = await api.apiCall("/movie/top_rated", params)
        const popularTvInfo = await api.apiCall("/movie/popular", params)
        const genreListInfo = await api.apiCall("/genre/movie/list", params)


        response.status(200).render("home",
            {
                data: {
                    npMovies: { info: npMoviesInfo.data.results, type: "movie" },
                    trMovies: { info: topratedMovieInfo.data.results, type: "movie" },
                    tvShows: { info: popularTvInfo.data.results, type: "movie" },
                    genreList: { info: genreListInfo.data.genres, type: "movie" },


                }
            })

    } catch (error) {
        console.log(error);
        response.status(400).json({ status: "getHomePage fail" })
    }
}

exports.getDetailPage = async (request, response, next) => {
    try {
        console.log(request.params);
        let params = {
            api_key: process.env.movieDB_API_KEY,

        }
        const movieDetails = await api.apiCall(`/${request.query.type}/${request.params.movieid}`, params)


        console.log(movieDetails);

        response.status(200).render("detail", { data: movieDetails.data })

    } catch (error) {
        console.log(error);
        response.status(400).json({ status: "getDetailPage fail" })
    }
}

exports.getTypePage = async (request, response, next) => {
    try {
        console.log(request.params);
        console.log(request.query);
        /**
         * https://api.themoviedb.org/3/discover/movie?api_key=44898f033c1064ee9e60d512e396cfcd&page=443&sort_by=release_date.desc
         * https://api.themoviedb.org/3/discover/movie?api_key=44898f033c1064ee9e60d512e396cfcd&page=443&sort_by=release_date.desc
         * https://api.themoviedb.org/3/movie/top_rated?api_key=44898f033c1064ee9e60d512e396cfcd&page=91
         * https://api.themoviedb.org/3/movie/popular?api_key=44898f033c1064ee9e60d512e396cfcd&page=499
         *  */

        let params = {
            api_key: process.env.movieDB_API_KEY,
            sort_by: "release_date.desc",
            page: request.query.page
        }
        /*
        https://api.themoviedb.org/3/discover/movie?
        api_key=44898f033c1064ee9e60d512e396cfcd
        &language=en-US
        &sort_by=popularity.desc
        &include_adult=false
        &include_video=false
        &page=2
        &with_watch_monetization_types=flatrate
        
        */
        console.log(params);


        let value = null

        if (request.params.typename === "movies") {
            value = "/movie/popular/"

        }
        else if (request.params.typename === "tv-shows") {
            value = "/tv/popular/"

        }

        const mediaDetails = await api.apiCall(value, params)
        // console.log(mediaDetails.data.results);
        const type = request.params.typename === "movies" ? "movie" : "tv"

        console.log("the type is:-----------------?", type);

        response.status(200).render("results",
            {
                paginate: true,
                page: request.query.page,
                num: 10,
                typeVal: request.params.typename,
                type: type,
                data: { info: mediaDetails.data.results, type: type }

            })

    } catch (error) {
        // console.log(error);
        response.status(400).json({ status: "getTypePage fail" })
    }
}

exports.getGenrePage = async (request, response, next) => {
    try {
        console.log(request.params);

        let params = {
            api_key: process.env.movieDB_API_KEY,
            sort_by: "release_date.desc",
            page: request.query.page
        }

        const genreList = await api.apiCall(`/discover/movie/`, params)

        console.log(genreList.data);


        response.status(200).render("results", {
            data: genreList.data.results,
            paginate: true
        })

    } catch (error) {
        console.log(error);

        response.status(400).json({ status: "getGenrePage fail" })
    }
}

exports.getSimilarPage = async (request, response, next) => {
    try {


        response.status(200).render("error")

    } catch (error) {

        console.log(error);
        response.status(400).json({ status: "getSimilarPage fail" })
    }
}


exports.getSearchResultsPage = (request, response, next) => {
    let storyInfo = []
    try {

        let searchVal = request.params.searchvalue
        console.log(searchVal);
        searchVal = searchVal.replace(/\s+/g, '-').toLowerCase();
        const url = `https://myflixer.pw/search/${searchVal}`

        got(url).then(res => {
            const $ = cheerio.load(res.body);
            const myElements = $('.flw-item')

            myElements.each((i, elm) => {
                const posterVal = $(elm).find("img").attr('data-src');
                const titleVal = $(elm).find("img").attr('title');
                const linkVal = $(elm).find("a").attr('href');

                storyInfo.push({ poster: posterVal, title: titleVal, link: linkVal })

            })

            response.status(200).render("search-results",
                {
                    data: {
                        paginate: false,
                        info: storyInfo

                    }
                }
            )


        }).catch(err => {
            console.log(err);

        });


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
exports.getPricingPage = async (request, response, next) => {
    try {


        response.status(200).render("error")

    } catch (error) {

        console.log(error);
        response.status(400).json({ status: "getSimilarPage fail" })
    }
}

