
function calcRoute(startLat, startLng, endLat, endLng) {

    // Create start and end location objects
    var start = {
        lat: startLat,
        lng: startLng
    }; var end = {
        lat: endLat,
        lng: endLng
    };

    // Creation direction request
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    }

    // Display direction if successful request
    directionsService.route(request, function (response, status) {
        if (status == 'OK') {
            infoWindow.close();
            directionsDisplay.setOptions({
                suppressMarkers: true
            });
            directionsDisplay.setDirections(response);
        }
    });

     // Create Button to close navigation
     var button = document.createElement('button');
     button.id = 'closeBtn'
     button.innerHTML = 'Close Navigation';
     map.controls[google.maps.ControlPosition.RIGHT_TOP].push(button);

     // end navigation and go to current location by button click
     button.addEventListener ("click", function() {
       directionsDisplay.setMap(null);
       navigator.geolocation.getCurrentPosition(success, error, options);
       var button = document.getElementById('closeBtn');
       button.parentNode.removeChild(button);
     });
}
