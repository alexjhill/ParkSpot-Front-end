var searchMarker;

function initAutocomplete() {
    var input = document.getElementById('searchBox');
    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        var position = JSON.parse(JSON.stringify(place.geometry.location));
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            // window.alert("No details available for input: '" + place.name + "'");
            errorBox.innerHTML = '<div class="mx-4 shadow-sm alert alert-danger alert-dismissible fade show" role="alert"><span><strong>No location found:</strong> ' + place.name + '</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            getSpots(position)
            searchMarker.setPosition(position);
            map.fitBounds(place.geometry.viewport);
            map.setZoom(16);
            $("input").blur();
        } else {
            map.setCenter(position);
            map.setZoom(16);
            $("input").blur();
        }

    });

    //hide label when input field is on focus
    $("input").focus(function () {
        $(this).prev("label").hide();
    });

    //show label if input field has no value
    $("input").blur(function () {
        if(!$.trim(this.value).length) {
            $(this).prev("label").show();
        }
    });
}
