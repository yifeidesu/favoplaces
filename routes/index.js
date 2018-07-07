var express = require('express');
var router = express.Router();


const passport = require('passport');
const Favo = require('../models/favo');
var User = require('../models/user');

var place_ids = [];
var favo_places = [];

var middlewares = require('../middleware/middlewares.js');

router.get('/', (req, res) => {
    res.redirect('/favos');
});

router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register'); //? why not redirect
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/favos');
        });
    });
});

// router.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
 });

/**
 * REGISTER ROUTES
 */
router.get('/register', (req, res) => {
    res.render('register', { title: "Sign up | " });
});

/****************
 * LOGIN ROUTES *
 ****************/
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login | ' });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.'
}), function (req, res) {
    //res.redirect(req.originalUrl);
});

// SEARCH ROUTE
router.get('/search', middlewares.isLoggedIn, (req, res) => {
    Favo.find({}, function (err, favos) {
        favos.forEach((favo) => {
            place_ids.push(favo.place_id);
        });
    });
    res.render('search', { place_ids: place_ids, title: "Search | ", user: req.user });
});

module.exports = router;
