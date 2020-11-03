const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article 