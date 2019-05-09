var map;
var userPos;
var infoWindow;
var errorBox = document.getElementById("errorBox");

function initMap() {
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

    // Get location
    navigator.geolocation.getCurrentPosition(success, error, options);

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
    console.log(userPos);
    map.setCenter(userPos);
    map.setZoom(16);

    var userMarker = new google.maps.Marker({
        position: userPos,
        map: map
    });
}

// Location error callback
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    errorBox.childNodes[1].innerHTML = "<strong>Location error:</strong> " + err.message;
    errorBox.className += "show";
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

    spaceMarker.addListener('click', function(){
        infoWindow.open(map, spaceMarker);
        infoWindow.setContent('<h1 class="text-center">' + _id + '</h1><button class="btn btn-primary">Navigate</button>');
    });
}
