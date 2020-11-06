const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

// Passport config
require('./config/passport')(passport)

// DB Config
const db = require('./config/keys').MongoURI

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// EJS 
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended:false }))

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated()
    next()
})
app.use(passport.session())

// Connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Static folder middleware
app.use(express.static(__dirname + '/public'))

// Routes 
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/articles', require('./routes/articles'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server started on port ${PORT}`))