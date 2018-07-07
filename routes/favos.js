var express = require('express');
var router = express.Router();

var Favo = require('../models/favo');
var User = require('../models/user');
var Comment = require('../models/comment');

var middlewares = require('../middleware/middlewares.js');

var place_ids = [];
var favo_places = [];

// FAVOES ROOT ROUTE
router.get('/', function (req, res) {
    Favo.find({}).populate('authors').exec(function (err, favos) {
        if (err) {
            console.log(err);
        } else {
            res.render("favos/favos", { favos: favos, user: req.user });
        }
    });
});

// CREATE
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
    Favo
        .findById(req.params.id)
        .populate("authors")
        .populate("comments")
        .exec(function (err, foundFavo) {
            if (err) {
                console.log(err);
            } else {
                res.render("favos/show", { favo: foundFavo, user: req.user });
            }
        });
});


// CREATE COMMENT
router.post('/:id/comments', middlewares.isLoggedIn, function (req, res) {
    Favo.findById(req.params.id, function (err, favo) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.user) {
                        comment.author = req.user;
                    }
                    favo.comments.push(comment);
                    favo.save();
                    const favoShowUrl = '/favos/' + req.params.id;
                    res.redirect(favoShowUrl);
                }
            });
        }
    });
});

module.exports = router;
