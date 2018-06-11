var map;
var input;
var infowindow;
var markers = [];

var lat = -33.867;
var lng = 151.195;
var center = { lat: lat, lng: lng };

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 15
  });

  var input = document.getElementById('input');
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(lat - 0.05, lng - 0.05),
    new google.maps.LatLng(-33.8474, 151.2631)
  );
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);




  infowindow = new google.maps.InfoWindow();
  // nearbySearch(center, keyword);


  // Bias the SearchBox results towards current map's .
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  // where places will change? enter a text into input and hit enter.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();
    clearMarkers();
    places.forEach
    console.log('places number = ' + places.length);

  });
}

function nearbySearch(pyrmont, keyword) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    type: ['store'],
    keyword: keyword // from input 
  }, onSearchResult);
}

function onSearchResult(results, status) {

  if (status === google.maps.places.PlacesServiceStatus.OK) {

    clearMarkers();

    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function clearMarkers() {
  markers.forEach((marker) => { marker.setMap(null); });
  markers = [];
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'mouseover', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}


