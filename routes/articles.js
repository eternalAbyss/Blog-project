const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')

// Article model
const Article = require('../models/Article')

// Article homepage
router.get('/', (req,res) => {
    Article.find()
        .then(articles => {
            if(articles) {
                res.render('articles', { articles })
            } else {
                res.status(400).json({msg : `No Item found`})
            }
        }).catch(err => console.log(err))
})

// Write article
router.get('/write', ensureAuthenticated, (req,res)=> { res.render('write') })

// Article extended
router.get('/:id', ensureAuthenticated, (req,res)=>{
    // // console.log(String(req.params.id))
    // // res.end()
    // const article  = Article.findOne({_id: String(req.params.id)})
    // res.render('extended', {article})
    Article.findOne({ _id: String(req.params.id)})
        .then(article => {
            if(article) {
                res.render('extended', { article })
            } else {
                res.status(400).json({msg : `No Item found`})
            }
        }).catch(err => console.log(err))
})


// Article Handle
router.post('/write', ensureAuthenticated, (req,res) => {
    const { author, title, article } = req.body
    let errors = []

    if(!author || !article) {
        errors.push({msg: 'Please fill in all the fields'})
    }

    if(errors.length > 0) {
        res.render('write', {
            author,
            title,
            article
        }) 
    } else {
        const newArticle = new Article({
            author,
            title,
            article
        })

        newArticle.save()
            .then(article => {
                req.flash('article_saved', 'Your Article is Uploaded' )
                res.redirect('/articles/')
            })
    }
})

module.exports = router