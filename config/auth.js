module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            res.locals.login = req.isAuthenticated()
            return next()
        }
        req.flash('error_msg', 'Please log in to view this resource')
        res.redirect('/users/login')
    }
}