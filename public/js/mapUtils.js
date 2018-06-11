                    
// all markers added on the given map
var markers = [];

// array of markers, to experimentally mark the map.
var seeds = [
    { lat: -33.8688, lng: 151.2195 },
    { lat: -33.8687, lng: 151.2195 },
    { lat: -33.8686, lng: 151.2195 },
    { lat: -33.8685, lng: 151.2195 }
];

/**
 * add marker for given location on the map.
 * @param {latLng pair} location 
 * @param {google.maps.Map} map 
 */
function addMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

/**
 * add seeds markers on map
 * @param {google.maps.Map} map 
 */
function addSeeds(map) {
    seeds.forEach((location) => {
        addMarker(location, map)
    })
}


google.maps.event.addListener(map, 'click', function (event) {
    addMarker(event.latLng, map);
  });

export { addMarker, addSeeds, markers };



