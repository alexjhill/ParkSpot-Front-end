var map;
var userPos;
var infoWindow;
var errorBox = document.getElementById("errorBox");

function initMap() {

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            featureType: "transit.station",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    // Draw map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.509865, lng: -0.118092},
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: myStyles
    });

    // Draw location button
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);

    // Get user location
    navigator.geolocation.getCurrentPosition(success, error, options);


    directionsDisplay.setMap(map);


    // Get spaces
    $.getJSON("static/data/spaces.json", function(json) {
        showSpaces(json);
    });

}


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
    map.setCenter(userPos);
    map.setZoom(16);

    var userMarker = new google.maps.Marker({
        position: userPos,
        map: map,
        icon: 'static/img/user-position.svg'
    });
}

// Location error callback
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    errorBox.innerHTML = '<div class="mx-4 shadow-sm alert alert-danger alert-dismissible fade show" role="alert"><span><strong>Location error:</strong> ' + err.message + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
}

function showSpaces(spaces) {
    infoWindow = new google.maps.InfoWindow({})
    jQuery.each(spaces, function(i, space) {
        addMarker(space._id, space.lat, space.lng);
    });
}

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

    spaceMarker.addListener('click', function() {
        infoWindow.open(map, spaceMarker);
        infoWindow.setContent('<h1 class="text-center">' + _id + '</h1><button id="directionsbtn" onclick="calcRoute(' + userPos.lat + ', ' + userPos.lng + ', ' + coords.lat + ', ' + coords.lng + ')" class="btn btn-primary">Navigate</button>');
    });

}


function calcRoute(startLat, startLng, endLat, endLng) {
    var start = {
        lat: startLat,
        lng: startLng
    }; var end = {
        lat: endLat,
        lng: endLng
    };

    console.log(start + ", " + end)
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }

    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            infoWindow.close();
            directionsDisplay.setOptions({
                suppressMarkers: true
            });
            directionsDisplay.setDirections(response);
        }
    });
}
