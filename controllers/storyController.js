const cheerio = require('cheerio');
const got = require('got')


exports.getResults = (request, response, next) => {

    try {

        let storyInfo = []

        let searchVal = request.params.searchValue
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

            response.status(200).json({ status: "success", data: storyInfo })



        }).catch(err => {
            console.log(err);

        });


    } catch (error) {

    }

}