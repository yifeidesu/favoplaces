var mongoose = require("mongoose");
var Favo = require("./models/favo.js");
var User = require("./models/user.js");
const Comment = require('./models/comment.js');

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
    authors: [],
    comments: []

  },
  {
    place_id: "ChIJD_H5Lvc5K4gRAEAdpPVcsnY",
    name: "Perkins Family Restaurant", address: "600 Dixon Rd, Etobicoke, ON M9W 1J1, Canada",
    rating: 3.7,
    position: "(43.6918454, -79.57281319999998)",
    photo_url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=716729f150e7137d6873291d1ef9c9a4&auto=format&fit=crop&w=1534&q=80',
    is_favo: true,
    authors: [],
    comments: []
  },
  {
    place_id: "ChIJ22ZUQsQ0K4gR3QMawslioBI",
    name: "Morals Village Hot Pot Downtown",
    address: "436 Dundas St W., 2nd Floor, Toronto, ON M5T 1G7, Canada",
    rating: 3.3,
    position: "(43.653552, - 79.39566400000001) ",
    photo_url: '',
    is_favo: true,
    authors: [],
    comments: []
  },
  {
    place_id: "ChIJ7-AD-I45K4gRA3Q4Vozr1Mw",
    name: "Moxie's Grill & Bar",
    address: "55 Reading Ct, Etobicoke, ON M9W 7K7, Canada",
    rating: 4.1, "position": "(43.68988359999999, -79.59061109999999)",
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAdYobOkihysxW0BW-CrYhDIbs2fnMl2rMxzIQn75rTpYOpWMJqAFxN6zNuqKI9QVIcDZWyb65n9tP2BFBIWgpfcax3QLYg9XSge-zDx9M3pig7KuY5EYlp7GLP7ZT662wEhAOUf5xAZWgk2YcNFW_FRaGGhQ8VLxPsjYfUyyeGZTOnRcGvf2MHw&4u100&5m1&2e1&callback=none&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&token=79791",
    is_favo: true,
    authors: [{
      username: "Robin"
    }],
    comments: [], "__v": 0
  },
  {
    place_id: "ChIJDW6zQaVDK4gRsNqHgcZqqPg",
    name: "KFC",
    address: "3015 Winston Churchill Blvd, Mississauga, ON L5L 2V7, Canada",
    rating: 3.1, "position": "(43.5238643, -79.68180039999999)",
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAmSD41LRR64cNKeWf82zFtiNKZFx6mmChUhscykw9otiQxDDfsTzuD7Dir_EdGxkGiTilVcruLTjLW-JOxFKanFCO2upMQ6qNXBZZQj3w1e_DaxeoMUWoBrqnLgQtuUZzEhDcigiUGXUNQ9RlozingL6UGhRZUZsgJ38qkThF4iKfeWn63zDIeg&4u100&5m1&2e1&callback=none&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&token=110033",
    is_favo: true,
    authors: [{
      username: "Robin"
    }],
    comments: [], "__v": 0
  },
  {
    place_id: "ChIJX16WPcY0K4gR_ndyY-nnECY",
    name: "Kowloon Dim Sum Restaurant",
    address: "5 Baldwin St, Toronto, ON M5T 1L1, Canada",
    rating: 4,
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAanZAOBiyraMSwjcV2AfynXX5T7HCHCaMrDvbSpJSGaCkVFd_NDhqXywwTybM0SIl1MnBaCZQP7fDPntGpuU9xowFoV9WS0qdY-Szm0PUrnSpA-01_xT53tMxXyR4daiVEhABezf4UIuD_IBdvlbwII1QGhSzPUFIJ_E6W-ebt0VUjzwBxHdzBA&4u100&5m1&2e1&callback=none&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&token=60659",
    is_favo: true,
    authors: [{
      username: "Robin"
    }],
    comments: [], "__v": 0
  }
];

function seedDB() {
  // Clear db
  Favo.remove({}, function (err) {
    if (err) {
      console.log(err);
    }

    console.log("Cleaned up favo collection!");

    //add a few items to db
    seeds.forEach(function (seed) {
      Favo.create(seed, function (err, favo) {
        if (err) {
          console.log(err)
        } else {
          // console.log("added a favo");
          // console.log('** seed ** FAVO.AUTHORS = ' + JSON.stringify(favo.authors));
          for (var i = 0; i < getRandomInt(4) + 1; i++) {
            favo.authors.push(users[i]);
          }
          //const author = new User({username: 'Joe'})
          const cmt = new Comment({
            text: "Nice Nice 😉",
            author: new User({ username: 'Joe' })
          });

          const cmt1 = new Comment({
            text: "The best!",
            author: new User({ username: 'Jerry' })
          });


          favo.comments.push(cmt, cmt1);
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
