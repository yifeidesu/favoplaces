var favos = [];  // array of place_ids of favoed markers
var markers = []; // array of markers on the map

function initAutocomplete() {

  // Tononto
  lat = 43.6565353;
  lng = -79.601036;
  var center = { lat: lat, lng: lng };

  // create map instance.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 10,
    mapTypeId: 'roadmap'
  });

  // create center marker on map.
  var centerMarker = new google.maps.Marker({
    position: center,
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });

  var centeriw = new google.maps.InfoWindow({
    content: 'Search places near Toronto!',
    maxWidth: 300
  });
  // listeners for place markers.
  centerMarker.addListener('click', function () {
    centeriw.open(map, centerMarker);
  });

  // setup searchBox. provide predictions for search.
  var input = $('#search-input')[0];
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  // Bias the SearchBox results towards current map's .
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  // setup searchBox places change listener. Manipulations on new places.
  searchBox.addListener('places_changed', onPlacesChanged(searchBox, map));

  function input_submit_debug() {
    input.value = 'coffee';
    $(input).submit();
  }
}

function onPlacesChanged(searchBox, map) {
  return function () {

    // Get new places.
    var places = searchBox.getPlaces();

    if (places.length == 0) return;

    // Clear markers to take new.
    clearMarkers(markers);
    var iw_current = new google.maps.InfoWindow({});

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {

      // Handle no geometry cases.
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        is_favo: false,
        place_id: place.place_id,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });

      var photos = place.photos;
      if (photos) {
        var photo
        marker.photo_url = photos[0].getUrl({ 'maxHeight': 100 });
      }

      // Fill markers array with new.
      markers.push(marker);

      marker.addListener('click', function () {
        // close opened iw before open new one.
        iw_current.close();

        // create info window
        var iw = new google.maps.InfoWindow({
          content: infoWindowContent(marker),
          maxWidth: 350
        });

        // update currently opened iw
        iw_current = iw;

        iw.open(map, marker);

        // set up infowindow content
        setupInfoWindow(marker);

        // When mouse leaves iw, hold for timeout and close it.
        // $('div.gm-style-iw').on('mouseleave', function () {
        //   setTimeout(() => {
        //     iw.close();
        //   }, 2000);
        // });
      });

      // adjust bounds
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      }
      else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  };
}

// When infowindow inflated, add styles and listener on infowindow's view elements.
function setupInfoWindow(marker) {

  var favoBtn = $('#favo-btn');
  var span = $('#favo-span');
  var place_id = marker.place_id;

  if (favos.includes(place_id)) {
    marker.is_favo = true;
  }

  toggleFavoBtn(marker.is_favo);

  favoBtn.on('click', function () {

    marker.is_favo = !marker.is_favo;
    var isFavo = marker.is_favo;

    toggleFavoBtn(isFavo);

    if (isFavo) {
      favos.push(marker.place_id);
    } else {
      favos.pop('marker_id');
    }
  });

  function toggleFavoBtn(isFavo) {
    var favoHtml = '<i class="fas fa-heart"></i>  Favorate!';
    var notFavoHtml = 'Add to Favo'

    if (isFavo) {
      favoBtn.html(favoHtml);
    } else {
      favoBtn.html(notFavoHtml);
    }

    favoBtn.toggleClass('btn-danger', isFavo);
    favoBtn.toggleClass('btn-success', !isFavo);
  }
}

function infoWindowContent(marker) {

  var image_piece = '';

  // move to favos index
  // if (marker.photo_url) {
  //   image_piece = '<img src="' + marker.photo_url + '" alt="place image">';
  // }

  var rating = marker.rating;

  var content =
    '<div id="iw-container" class="container">' +
    '<p id="marker-name">' + marker.name + '</p>' +
    '<p id="marker-address">' + marker.address + '</p>' +
    '<p id="marker-rating">' + ratingHtml(rating) + ' </p>' +
    image_piece +
    '<form action="/favos" method="POST">' +
    '<input type="hidden" value="' + marker.place_id + '" name="marker[place_id]">' +
    '<input type="hidden" value="' + marker.name + '" name="marker[name]">' +
    '<input type="hidden" value="' + marker.address + '" name="marker[address]">' +
    '<input type="hidden" value="' + marker.rating + '" name="marker[rating]">' +
    '<input type="hidden" value="' + marker.position + '" name="marker[position]">' +
    '<input type="hidden" value="' + marker.photo_url + '" name="marker[photo_url]">' +
    '<input type="hidden" value="true" name="marker[is_favo]">' +
    '<button id="favo-btn" type="submit" class="btn btn-sm btn-success">' +
    '</button>' +
    '</form>' +
    '</div>'
    ;

  return content;
}

/**
 * Clear markers array for new search results.
 */
function clearMarkers(markers) {
  // remove from map
  markers.forEach(function (marker) {
    marker.setMap(null);
  });

  // remove from array
  markers = [];
}
