  angular.module('AreaSearchApp', [])
            .controller('LocationController', ['$window', function($window){
                $window.map = new google.maps.Map(document.getElementById('map'),{
                    center: {lat: 18.52 , lng: 73.86},
                    zoom: 15
                });
                var input = document.getElementById('searchBox');
                var searchBox = new google.maps.places.SearchBox(input);
                $window.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                                // Bias the SearchBox results towards current map's viewport.
                $window.map.addListener('bounds_changed', function() {
                    searchBox.setBounds($window.map.getBounds());
                  });

                var markers = [];
                  // Listen for the event fired when the user selects a prediction and retrieve
                  // more details for that place.
                searchBox.addListener('places_changed', function() {
                    var places = searchBox.getPlaces();

                    if (places.length == 0) {
                      return;
                    }

                    // Clear out the old markers.
                    markers.forEach(function(marker) {
                      marker.setMap(null);
                    });
                    markers = [];

                    // For each place, get the icon, name and location.
                    var bounds = new google.maps.LatLngBounds();
                    places.forEach(function(place) {
                      if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                      }
                      var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                      };

                      // Create a marker for each place.
                      markers.push(new google.maps.Marker({
                        map: $window.map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                      }));

                      if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                      } else {
                        bounds.extend(place.geometry.location);
                      }
                    });
                    $window.map.fitBounds(bounds);
                });
            }        
        ]);    



