var infoWindow;
var spotMarkers = [];

// AJAX request for parking spots based on passed location
function getSpots(location) {
    $.ajax({
        type : 'POST',
        url : "/",
        data : location,
        success: function(response) {
            var spots = JSON.parse(response);
            showSpots(spots);
        },
        error: function(xhr) {
            console.warn("ERROR: " + xhr);
            errorBox.innerHTML = '<div class="mx-4 shadow-sm alert alert-danger alert-dismissible fade show" role="alert"><span><strong>Location error:</strong> ' + xhr + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
        }
    });
    map.controls[google.maps.ControlPosition.BOTTOM].clear();
}

// Create each spot markers from spot data
function showSpots(spots) {
    for (var i = 0; i < spotMarkers.length; i++) {
        spotMarkers[i].setMap(null);
    }
    spotMarkers = [];
    infoWindow = new google.maps.InfoWindow({})
    jQuery.each(spots, function(i, spot) {
        addMarker(spot.pi_id, spot.coords_lat, spot.coords_long);
    });
}

// Create marker function
function addMarker(_id, lat, lng) {
    var coords = {
        lat: lat,
        lng: lng
    };
    var spotMarker = new google.maps.Marker({
        position: coords,
        map: map,
        icon: 'static/img/car.svg'
    });
    spotMarkers.push(spotMarker);
    // Spot marker click event
    spotMarker.addListener('click', function() {
        infoWindow.open(map, spotMarker);
        infoWindow.setContent('<h1 class="text-center">' + _id + '</h1><button id="directionsbtn" onclick="calcRoute(' + userPos.lat + ', ' + userPos.lng + ', ' + coords.lat + ', ' + coords.lng + ')" class="btn btn-primary">Navigate</button>');
    });

    // Close infoWindow on clicking the map
    google.maps.event.addListener(map, 'click', function(event) {
      infoWindow.close();
    });


}
