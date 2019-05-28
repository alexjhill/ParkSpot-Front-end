var infoWindow;

// Create each spot markers from spaces data
function showSpaces(spots) {
    infoWindow = new google.maps.InfoWindow({})
    jQuery.each(spots, function(i, spot) {
        console.log("Spot: " + spot);
        addMarker(spot.pi_id, spot.coords_lat, spot.coords_long);
    });
}

// Create marker function
function addMarker(_id, lat, lng) {
    var coords = {
        lat: lat,
        lng: lng
    };
    var spaceMarker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: 'static/img/car.svg'
    });
    // Space marker click event
    spaceMarker.addListener('click', function() {
        infoWindow.open(map, spaceMarker);
        infoWindow.setContent('<h1 class="text-center">' + _id + '</h1><button id="directionsbtn" onclick="calcRoute(' + userPos.lat + ', ' + userPos.lng + ', ' + coords.lat + ', ' + coords.lng + ')" class="btn btn-primary">Navigate</button>');
    });

}
