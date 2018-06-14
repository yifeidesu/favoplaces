var place_id = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // default id

var a = authors.replace(/&quot;/g, '"');
var authors_jso = JSON.parse(a);

var favo = favo.replace(/&quot;/g, '"');
var favo = JSON.parse(favo);
place_id = favo.place_id;

var url = '';

//var favoUsersString = favoUsersString(authors_jso);
//$('#users').text(favoUsersString);

//$('#rating').html(ratingStarsHtml(ratingStarsHtml));


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
        placeId: place_id
    }, function (place, status) {
        console.log('===' + JSON.stringify(place));
        console.log('===\n' + JSON.stringify(place.photos));

        url = place.url;

        $('#address').html('<span><i class="fas fa-map-marker"></i></span> ' + place.formatted_address);
        $('#phone').html('<span><i class="fas fa-phone"></i></span> ' + place.formatted_phone_number);
        setWebsite(place);
        setReviews(place);

        var ratingNumber = favo.rating;
        console.log('===');
        console.log('===');
        console.log('===');
        
        console.log(ratingNumber);
        
        var ratingHtml = ratingNumber + ' ' + ratingStarsHtml(ratingNumber);
        console.log(ratingHtml);
        
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

function setWebsite(place) {
    if (typeof place.website == 'undefined') return;
    $('#website').html('<i class="fas fa-link"></i> ' + place.website);
}

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
        '<div><p id="author-name">' + author_name + '</p>'
        + '<p id="text">' + text + '</p></div>';
}

function ratingStarsHtml(ratingNumber) {
    var starIcon = '<i class="fas fa-star"></i> ';
    var ratingIcons = '';
    for (var i = 0; i < ratingNumber; i++) {
        ratingIcons += starIcon;
    }
    return ratingIcons;
}