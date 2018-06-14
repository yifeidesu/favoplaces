var mongoose = require("mongoose");
var Favo = require("./models/favo.js");
var User = require("./models/user.js");

var users = [
  new User({
    username: "Bria"
  }),

  new User({
    username: 'Mia'
  }),

  new User({
    username: 'Robin'
  }),

  new User({
    username: 'Amy'
  })
];

var seeds = [
  {
    place_id: "ChIJcSuaJIg2K4gRP08a2TbYwCo",
    name: "Coffee Tree Roastery",
    address: "2412 Bloor St W, Toronto, ON M6S 1P9, Canada",
    rating: 4.5,
    position: "(43.649681, -79.48359700000003)",
    photo_url: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af920b383b3a7b889beb1dd53998ecd3&auto=format&fit=crop&w=752&q=80',
    is_favo: true,
    authors: []
  },
  {
    place_id: "ChIJD_H5Lvc5K4gRAEAdpPVcsnY",
    name: "Perkins Family Restaurant", address: "600 Dixon Rd, Etobicoke, ON M9W 1J1, Canada",
    rating: 3.7,
    position: "(43.6918454, -79.57281319999998)",
    photo_url:'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=716729f150e7137d6873291d1ef9c9a4&auto=format&fit=crop&w=1534&q=80',
    is_favo: true,
    "authors": []
  },
  {
    place_id: "ChIJ22ZUQsQ0K4gR3QMawslioBI",
    name: "Morals Village Hot Pot Downtown",
    address: "436 Dundas St W., 2nd Floor, Toronto, ON M5T 1G7, Canada",
    rating: 3.3,
    position: "(43.653552, - 79.39566400000001) ",
    photo_url: 'https://images.unsplash.com/photo-1505233276084-d944dbc8f17d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=618086894afe9854ca3310f7f16e3e6e&auto=format&fit=crop&w=750&q=80',
    is_favo: true,
    authors: []
  }
];

function seedDB() {
  //Remove all campgrounds
  Favo.remove({}, function (err) {
    if (err) {
      console.log(err);
    }

    console.log("removed favos!");

    //add a few campgrounds
    seeds.forEach(function (seed) {
      Favo.create(seed, function (err, favo) {
        if (err) {
          console.log(err)
        } else {
          console.log("added a favo");
          console.log('** seed ** FAVO.AUTHORS = ' + JSON.stringify(favo.authors));
          for (var i = 0; i < getRandomInt(4) + 1; i++) {
            favo.authors.push(users[getRandomInt(4)]);
          }

          //favo.authors.push(users[getRandomInt(4)]);
          console.log('** seed ** FAVO.AUTHORS = ' + JSON.stringify(favo.authors));
          favo.save();
        }
      });
    });
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = seedDB;
