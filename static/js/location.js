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
    };
    $.ajax({
        type : 'POST',
        url : "/",
        data : userPos,
        success: function(response) {
            var spots = JSON.parse(response);
            console.log(spots);
            showSpaces(spots);
        },
        error: function(xhr) {
            console.warn("ERROR: " + xhr);
            errorBox.innerHTML = '<div class="mx-4 shadow-sm alert alert-danger alert-dismissible fade show" role="alert"><span><strong>Location error:</strong> ' + xhr + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
        }
    });
    map.setCenter(userPos);
    map.setZoom(16);
    userMarker.setPosition(userPos);
}

// Location error callback
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    errorBox.innerHTML = '<div class="mx-4 shadow-sm alert alert-danger alert-dismissible fade show" role="alert"><span><strong>Location error:</strong> ' + err.message + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
}
