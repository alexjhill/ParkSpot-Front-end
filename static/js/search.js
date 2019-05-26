function initAutocomplete() {
  var input = document.getElementById('searchBox');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

//  var marker = new google.maps.Marker({
//    map: map,
//    anchorPoint: new google.maps.Point(0, -29)
//  });

  autocomplete.addListener('place_changed', function() {
//    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
      $("input").blur();
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(16);
      $("input").blur();
    }
//    marker.setPosition(place.geometry.location);
//    marker.setVisible(true);

  });

  //hide lable when input field is on focus
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
