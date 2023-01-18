const mongoose = require("mongoose")
const slugify = require("slugify")

const moviesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "a movie must have a name"],
            unique: true,
            trim: true,
            maxLength: [50, "name has exceed maximum length (40)"],
            minLength: [3, "name length should be increased"]
        },

        overview: {
            type: String,
            required: [true, "a movie must have a summary"],
            trim: true
        },
        gotten_id: {
            type: String,
            required: [true, "a movie must have an id"],

        },
        imagePath: {
            type: String,
            required: [true, "a movie must have a image url path"],
        },

        vote_average: {
            type: Number,
            required: [true, "a movie must have a vote average"],
        },

        releaseDate: {
            type: Date,
        },
        genre_ids: [
            {
                type: String,
                required: [true, "a movie must have an  genre ids"],

            }
        ],
        slug: String,

    },
    {
        //allows virtual fields to show up in responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })


moviesSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true, trim: true })
})

const moviesModel = mongoose.model("Movie", usersSchema)

module.exports = moviesModel