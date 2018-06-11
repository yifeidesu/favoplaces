var mongoose = require("mongoose");

var favoschma = new mongoose.Schema({
    name: String,
    address: String,
    position: String, // latlng pair
    rating: Number,
    is_favo: Boolean,
    place_id: String,
    photo_url: String,
    authors: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }]
});

module.exports = mongoose.model("Favo", favoschma);