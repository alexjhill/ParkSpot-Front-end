
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
}
