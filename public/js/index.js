function initialize() {
    var newmarket = { lat: -33.8688, lng: 151.2195 };
    var mapEl = document.getElementById('map'); // dom element 

    var map = new google.maps.Map(mapEl, {
        zoom: 12,
        center: newmarket
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng, map);
    });

    // Add a marker at the center of the map.
    addMarker(newmarket, map);
    addSeeds(map)
}

google.maps.event.addDomListener(window, 'load', initialize);
console.log('map js executed!');
