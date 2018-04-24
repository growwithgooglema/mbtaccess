// Google maps code to generate a map and populate it with
// info related to the end user's requested location

class Place {
  constructor({name="Your Current Location", formatted_address="", lat=null, lng=null, wheelchair_accessible=0} = {}) {
    this.name = name;
    this.formatted_address = formatted_address;
    this.wheelchair_accessible = wheelchair_accessible;
    this.geometry = {
      location: {
        lat: function() {
          return lat;
        },
        lng: function() {
          return lng;
        }
      }
    };
  }
}
var userLocation = new Place({name: 'Your Current Location'});
var map;  // Main map
var markers = [];  // Generated markers; every marker generated is added here
var infoClosed = false;  // Keeps track of whether or not an infoWindow has been closed
var currentlyOpened = false; // Keeps track of whether or not an infoWindow is currently opened

function initMap() {
  // Function called when navigator.geolocation.getCurrentPosition fails
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  // Function called when navigator.geolocation.getCurrentPosition succeeds
  function success(position) {
    var coords = position.coords;
    userLocation = new Place({lat: coords.latitude, lng: coords.longitude});
    // userLocation.geometry.location.lat = function() {
    //   return coords.latitude;
    // };
    // userLocation.geometry.location.lng = function() {
    //   return coords.longitude;
    // };
    if (markers.length === 0) {
      map.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
    }
    // makeMarkers(userLocation);
    console.log('Successfully obtained user geolocation data.');
  }
  // Try getting the user's current geolocation information
  navigator.geolocation.getCurrentPosition(success, error);
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(42.360091,-71.09416),
    zoom: 13
  });
  var mapCenter;
  if (userLocation.geometry.location.lat() && userLocation.geometry.location.lng()) {
    mapCenter = new google.maps.LatLng(
      userLocation.geometry.location.lat(),
      userLocation.geometry.location.lng()
    );
  } else {
    mapCenter = new google.maps.LatLng(42.360091,-71.09416);
  }
  // Force set center of the map again
  map.setCenter(mapCenter);

  // Convenient function to generate markers and place them on the map
  function makeMarkers(place) {
    var bounds = new google.maps.LatLngBounds();
    // 1 mile is 1.609344 kilometers
    var largeInfowindow = new google.maps.InfoWindow();
    var lat = place.geometry.location.lat();  // latitude from the place service
    var lng = place.geometry.location.lng();  // longitude from the place service
    var address = place.formatted_address;   // name of the place from the place service
    var name = place.name;
    var stopCounter = 0;
    var wheelchairCounter = 0;
    // Use localforage to iterate through the cached stops.
    // Grab each value and check if the location is within our expected radius.
    // If so, make a Place object and a marker for it. Then add the marker to the map.
    // Add an event listener to the generated marker to open the large info window
    // with the right information
    localforage.iterate(function(value, key, IterNumber) {
      // Check radius condition
      // Make Place object and marker
      // Add event listeners
      var p1 = {lat: lat, lon: lng};
      var p2 = {lat: value.lat, lon: value.lng};
      var distance = getDistanceBetweenTwoPoints(p1, p2);
      if (distance <= (1.609344/2)) {
        stopCounter += 1;
        var stop = new Place({
          name: value.name,
          lat: value.lat,
          lng: value.lng,
          wheelchair_accessible: value.wheelchair_boarding,
          formatted_address: `${distance.toFixed(2)} mile from ${place.name}.`
        });
        if (value.wheelchair_boarding > 0) {
          wheelchairCounter += 1;
          stop.message = "Wheelchair Accessible";
        } else {
          stop.message = "Not Wheelchair Accessible";
        }
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(stop.geometry.location.lat(), stop.geometry.location.lng()),
          title: `<p>${stop.name}</p><p>${stop.formatted_address}</p><p>${stop.message}</p>`,
          animation: google.maps.Animation.DROP
        });
        markers.push(marker);
        bounds.extend(new google.maps.LatLng(lat, lng));
        marker.addListener('click', function() {
          if (infoClosed) {
            largeInfowindow.setContent(`<div>${marker.title}</div>`);
            largeInfowindow.open(map, marker);
            currentlyOpened = true;
          } else {
            populateInfoWindow(this, largeInfowindow);
          }
        });
      }
    }).then(function() {
      // Recenter the map
      // Generate a div below the map with the number of stops found
      // Add info wheelchair accessibility
      map.setCenter(bounds.getCenter());
      console.log(`Number of stops: ${stopCounter}; Wheelchairs: ${wheelchairCounter}.`);
      // map.fitBounds(bounds);
      console.log('Markers generated and added to global markers tracker');
    }).catch(function(error) {
      console.log('An error occurred...');
      console.log(error);
    });
  }
  // A callback to handle the received response from Google maps' text search service
  function callback(results, status) {
    // console.log(results[0])
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      makeMarkers(results[0]);
    } else {
      alert('Could not find any information about your search term.');
      return;
    }
  }
  // A function to search for a place's geolocation info from text
  function pinPlace(searchText) {
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: searchText.toLowerCase(),
      location: mapCenter,
      radius: '50000'
    };
    service.textSearch(request, callback);
  }
  // Main function that populates an info window and places it on the map
  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<div>${marker.title}</div>`);
      infowindow.open(map, marker);
      currentlyOpened = true;
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
        infoClosed = true;
        currentlyOpened = false;
      });
    }
  }
  // Convenient function to hide markers from the map
  function hideMarkers() {
    for (let i=0; i<markers.length; i++) {
      markers[i].setMap(null);
      markers.pop();
    }
  }
  // An event handler that grabs the submitted search text and passes it to pinPlace
  document.querySelector("form").addEventListener('submit', function(event) {
    event.preventDefault();
    hideMarkers();
    // map.setZoom(13);
    var searchText = document.querySelector("#searchtxt").value;
    if (searchText === "" || !searchText) {
      // alert("Cannot submit form with empty search text.");
      // return;
      if (!userLocation.geometry.location.lat() && !userLocation.geometry.location.lng()) {
        alert("The application is probably busy retrieving your current location. Please try again later.");
        return;
      }
      makeMarkers(userLocation);
    } else {
      pinPlace(searchText);
    }
  });
  // map.fitBounds(bounds);
}

// The following has nothing to do with the map above.
// It's all JQuery code that handles some click events.
// There is also a snippet that takes care of updating
// the year in the footer
// Initialize tooltip component
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
// Initialize popover component
$(function () {
  $('[data-toggle="popover"]').popover();
});
$('a.nav-link').on('click', function() {
  var link = $(this);
  $('a.nav-link.active').removeClass('active');
  $('li.nav-item.active').removeClass('active');
  $(link).addClass('active');
});
// Calculate current year for footer
var currentYear = new Date().getFullYear();
$("#copyright").html(`&copy; ${currentYear}`);