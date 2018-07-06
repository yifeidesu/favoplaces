
var placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // default id

// var a = authors.replace(/&quot;/g, '"');
// var authors_jso = JSON.parse(a);

let reference = '';

var favo = favo.replace(/&quot;/g, '"');
var favo = JSON.parse(favo);

setReviewsDb(favo);

placeId = favo.place_id;

var url = '';

var favoUsersString = favoUsersString(favo);
$('#users').text(favoUsersString);
$('#rating').html(ratingStarsHtml(ratingStarsHtml));


/******************
 * BASIC INFO DIV *
 ******************/

// local site comments
if (favo.comments.length > 0) {
    console.log('COMMENT');
    console.log(favo.comments[0].text);
}

function ratingStarsHtml(ratingNumber) {
    var starIcon = '<i class="fas fa-star"></i> ';
    var ratingIcons = '';
    for (var i = 0; i < ratingNumber; i++) {
        ratingIcons += starIcon;
    }
    return ratingIcons;
}

/**
 * 
 * @param {Favo} 
 */
function favoUsersString(favo) {
    var favoUsersString = '';
    var authors = favo.authors;
    authors.forEach(function (author) {
        favoUsersString += author.username + ', ';
    });

    var favoUsersString = favoUsersString.slice(0, -2);
    return favoUsersString;
}

/**************
 * REVIEW DIV *
 **************/
function setReviews(place) {
    if (place.reviews.length < 1) return;
    var reviewsHtml = '';
    place.reviews.forEach(function (review) {
        reviewsHtml += reviewItemHtml(review);
    });

    $('#reviews').html(reviewsHtml);
}

function reviewItemHtml(review) {
    var text = review.text;
    if (text.length < 1) return review_html = '';
    if (text.length > 200) {
        text = text.slice(0, 200) + '<a href=url> more...</a>'
    }

    var review_html = '';
    var author_name = '<span><i class="fas fa-user-circle"></i></span>' + review.author_name;
    var time = review.time;

    return review_html =
        '<div><p class="author-name">' + author_name + '</p>'
        + '<p class="cmt-text">' + text + '</p></div>';
}

/**
 * REVIEWS FROM DB
 */
function setReviewsDb(favo) {
    if (favo.comments.length < 1) {
        $('div.vertical-border').hide();
        return;
    }
    var reviewsHtml = '';
    
    favo.comments.forEach(function (cmt) {
        reviewsHtml += reviewItemHtmlDb(cmt);
    });

    $('#reviewsDB').html(reviewsHtml);
}
function reviewItemHtmlDb(comment) {

    if (comment.text.length > 200) {
        comment.text = text.slice(0, 200) + '<a href=url> more...</a>'
    }

    var review_html = '';
    var authorHtml = '<span><i class="fas fa-user-circle"></i></span>' + comment.author.username;

    return review_html =
        '<div><p class="author-name">' + authorHtml + '</p>'
        + '<p class="cmt-text">' + comment.text + '</p></div>';
}

/**
 * map service callback
 */
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.866, lng: 151.196 },
        zoom: 15
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
        placeId: placeId
    }, function (place, status) {
        //console.log('===' + JSON.stringify(place));
        console.log('***');
        var photoUrl = place.photos[0].getUrl;
        
        console.log(photoUrl({'maxWidth': 1000, 'maxHeight': 1000}));

        //console.log('===\n' + JSON.stringify(place.photos));
        reference = place.reference;
        //getPlacePhotoes(reference);

        url = place.url;
        $('#place-image').css('background-image', `url(${photoUrl({'maxWidth': 100, 'maxHeight': 100})})`);

        const address = place.formatted_address;
        if (address) {
            $('#address').html('<span><i class="fas fa-map-marker"></i></span>' + address);
        }
        
        const phoneNumber = place.formatted_phone_number;
        if(phoneNumber) {
            $('#phone').html('<span><i class="fas fa-phone"></i></span> ' + phoneNumber);
        } 

        const site = place.website;
        if (site) {
            $('#website').html('<i class="fas fa-link"></i> ' + site);

        }
      
        setReviews(place);

        var ratingNumber = favo.rating;
        var ratingHtml = ratingNumber + ' ' + ratingStarsHtml(ratingNumber);

        $('#rating').html(ratingHtml);

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    'Place ID: ' + place.place_id + '<br>' +
                    place.formatted_address + '</div>');
                infowindow.open(map, this);
            });
        }
    });
}

// GET PLACE PHOTOES
function getPlacePhotoes(photoRef) {
    console.log(photoRef);
    console.log(MAPKEY);


    const url =
        "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
        photoRef +
        "&key=" +
        MAPKEY;
    console.log(url);

    axios.get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
