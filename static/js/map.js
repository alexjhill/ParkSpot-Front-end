var map;
var errorBox = document.getElementById("errorBox");

function initMap() {
    // Declare directions service
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();

    // Remove unneeded icons
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

    // Create user marker
    userMarker = new google.maps.Marker({
        map: map,
        icon: 'static/img/user-position.svg'
    });

    // Get user location
    navigator.geolocation.getCurrentPosition(success, error, options);

    // Directions setup
    directionsDisplay.setMap(map);


    initAutocomplete();
}
