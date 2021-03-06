const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session');
const pug = require('pug');
const flash = require("connect-flash");

var favicon = require('serve-favicon');
var path = require('path');

require('dotenv').config();

// models
// const Favo = require("./models/favo");
 const User = require('./models/user');

// ROUTES
const indexRoutes = require('./routes/index.js');
const favosRoutes = require('./routes/favos.js');

const seedDB = require("./seeds");
seedDB();

const app = express();

app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public/assets', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressSession({
    secret: 'pizza is awesome!',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.DBURL);

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

app.use(indexRoutes);
app.use('/favos', favosRoutes);

var listener = app.listen(process.env.PORT || 8080, process.env.IP, () => {
    console.log('SERVER STARTED! PORT = ' + listener.address().port);
});