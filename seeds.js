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
    place_id: "ChIJB3HkvWwQljURDuc37KQsPoY",
    name: "Qingdao Jingfugong South Korean Cuisine",
    address: "43 Hong Kong W Rd, Shinan Qu, Qingdao Shi, Shandong Sheng, China, 266071",
    rating: 3.7,
    position: "(36.0575346, 120.36803179999993)",
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAA0No2vjLjVCi_n_I3kWYQhmZokStR7uvu38N8zdNozwDB4M1SBdZBMg57cFiMCbhTR7FgAZ04nxPcKFDeM1Z5cMYahobU4TOP-WElR66k9rKJMMdhNRzIFuziSj8DxwM4EhBWgYH3w365C6y9fgbFdvJnGhQUS8kgeUSH1nNozlbzJO1TbzhotA&4u100&5m1&2e1&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&callback=none&token=32250",
    is_favo: true,
    authors: []
  },

  {
    place_id: "ChIJcSuaJIg2K4gRP08a2TbYwCo",
    name: "Coffee Tree Roastery",
    address: "2412 Bloor St W, Toronto, ON M6S 1P9, Canada",
    rating: 4.5,
    position: "(43.649681, -79.48359700000003)",
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAPjU8vAJh9mNih2oDZ12Ja69_G-97p8oab93ZUCWCZTKWukykRJ7j20suaQOoN5ndtyh9Wxlc5AElK4gNJ959fyG-ri4Y4-9Xm-M4lZhsrzt2VoccaldbmFetP_M2aTe4EhB7fqj2wkXADANIpDHDBBxLGhQ54FS488i_nmj5aWxoTa_KtilBRA&4u100&5m1&2e1&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&callback=none&token=74917",
    is_favo: true,
    authors: []
  },
  {
    place_id: "ChIJD_H5Lvc5K4gRAEAdpPVcsnY",
    name: "Perkins Family Restaurant", address: "600 Dixon Rd, Etobicoke, ON M9W 1J1, Canada",
    rating: 3.7,
    position: "(43.6918454, -79.57281319999998)",
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAATAOwDo06l2HyZtsiK0cUC9W9LjMxnFnxFHrAktx6Vs8T6pOZyckSy_lOQ1EvYh_pWvK5_At4jE2gxzw1_MRFF7k8hIRAHsQsFrcPUk2Ijh9diPSGxo4wBoBid22D3ouUEhACHV--DOJetY0oO1dkFKH3GhRwXXUCkcOZZ6ZHEQIS9gDmu-Z9mg&4u100&5m1&2e1&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&callback=none&token=123122",
    is_favo: true,
    "authors": []
  },
  {
    place_id: "ChIJ22ZUQsQ0K4gR3QMawslioBI",
    name: "Morals Village Hot Pot Downtown",
    address: "436 Dundas St W., 2nd Floor, Toronto, ON M5T 1G7, Canada",
    rating: 3.3,
    position: "(43.653552, - 79.39566400000001) ",
    photo_url: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAADHJaPQSXAwZH06xFXnT-7Mr61z2akT-vC8oLD43QXG6fz1rPrYnq6dHLe7bA05IAVHnmIwkB95GifW3whNT2owjhmpX-zy_GGr3TewzbzfZy4ASWAakwvWNMiaVoN9k5EhAi07wySXwUDH7hF8QQE2wAGhQqcQktJ58qmM2WdU1hCz8Pg6lwzw&4u100&5m1&2e1&key=AIzaSyBuKUXPfazCgPzZo5IxPXd5eROvvIDqUzc&callback=none&token=13165",
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
