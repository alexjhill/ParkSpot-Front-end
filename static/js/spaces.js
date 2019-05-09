var infoWindow;

// Create each space markers from spaces data
function showSpaces(spaces) {
    infoWindow = new google.maps.InfoWindow({})
    jQuery.each(spaces, function(i, space) {
        addMarker(space._id, space.lat, space.lng);
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
