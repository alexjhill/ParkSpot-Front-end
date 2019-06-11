
function calcRoute(startLat, startLng, endLat, endLng) {

    var button;
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

     // Create button to close navigation
     if(!document.body.contains(document.getElementById('closeBtn'))){
       button = document.createElement('div');
       button.id = 'closeBtn'
       button.innerHTML = 'Close Navigation';
       map.controls[google.maps.ControlPosition.RIGHT_TOP].push(button);

       // stop navigation and go to current location by button click
       button.addEventListener ("click", function() {
         directionsDisplay.set('directions', null);
         navigator.geolocation.getCurrentPosition(success, error, options);
         var button = document.getElementById('closeBtn');
         button.parentNode.removeChild(button);
       });
     }
}
