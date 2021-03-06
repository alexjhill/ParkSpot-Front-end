var userPos;
var userMarker;


// Location options
var options = {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 0
};

// Location success callback
function success(pos) {
    userPos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude

        // lat: 52.370855,
        // lng: 4.897710
    };

    map.setCenter(userPos);
    map.setZoom(16);
    userMarker.setPosition(userPos);

    getSpots(userPos);
}

// Location error callback
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    errorBox.innerHTML = '<div class="mx-4 shadow-sm alert alert-danger alert-dismissible fade show" role="alert"><span><strong>Location error:</strong> ' + err.message + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
}
