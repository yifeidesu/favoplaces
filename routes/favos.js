//import ratingString from '../models/favoUtils.js';
var express = require('express');
var router = express.Router();

var Favo = require('../models/favo');
var User = require('../models/user');

var middlewares = require('../middleware/middlewares.js');

var ratingString = require('../models/favoUtils');

var place_ids = [];
var favo_places = [];


// Index
router.get('/', function (req, res) {
    Favo.find({}).populate('authors').exec(function (err, favos) {
        if (err) {
            console.log(err);
        } else {
            // let user = req.user;
            // console.log('User = ' + user);
            res.render("favos/favos", { favos: favos, currentUser: req.user });
        }
    });
});

// route = favos/ method = post
router.post('/', middlewares.isLoggedIn, function (req, res) {

    var marker = req.body.marker;
    var user = req.user;
    marker.authors = [];
    marker.authors.push(user);

    Favo.create(marker, function (err, newAddedMarker) {
        if (err) {
            console.log(err);
        } else {
            res.status(204).send();
        }
    });
});


// SHOW - show more about one favo place.
router.get('/:id', function (req, res) {
    Favo.findById(req.params.id).populate("authors").exec(function (err, foundFavo) {
        if (err) {
            console.log(err);
        } else {
            res.render("favos/show", { favo: foundFavo });
        }
    });
});

module.exports = router;