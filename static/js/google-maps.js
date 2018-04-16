// Google maps code to generate a map and populate it with
// info related to the end user's requested location

var map;  // Main map
var markers = [];  // Generated markers; every marker generated is added here
var infoClosed = false;  // Keeps track of whether or not an infoWindow has been closed
var currentlyOpened = false; // Keeps track of whether or not an infoWindow is currently opened
function initMap() {
  // Generate the map with a zoom of 13
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(42.360091,-71.09416),
    zoom: 13
  });
  // Set the center of the map to MIT
  map.setCenter(new google.maps.LatLng(42.360091, -71.09416));
  var bounds = new google.maps.LatLngBounds();

  // Convenient function to generate a marker and place it on the map
  function makeMarker(place) {
    // console.log(place);
    // 1 mile is 1.609344 kilometers
    var largeInfowindow = new google.maps.InfoWindow();
    var lat = place.geometry.location.lat();  // latitude from the place service
    var lng = place.geometry.location.lng();  // longitude from the place service
    var address = place.formatted_address;   // name of the place from the place service
    var name = place.name;
    var stopCounter = 0;
    var wheelchairCounter = 0;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: `<p>${name}</p><p>${address}</p><p>MBTA stops information currently being processed. The card will refresh when the info is available.</p>`,
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
    map.setCenter(new google.maps.LatLng(lat, lng));
    // Use localforage to iterate through the cached MBTA stops data
    // For each stops, check that it's within a mile of the marker's geo info
    // If so, increment our main counter by 1
    // If also it's wheelchair access, increment the wheelchair counter by 1
    localforage.iterate(function(value, key, IterNumber) {
      var p1 = {lat: lat, lon: lng};
      var p2 = {lat: value.lat, lon: value.lng};
      if (getDistanceBetweenTwoPoints(p1, p2) <= (1.609344/2)) {
        stopCounter += 1;
        if (value.wheelchair_boarding > 0) {
          wheelchairCounter += 1;
        }
      }
    }).then(function() {
      // console.log("Done iterating");
      var newTitle = `<p>${name}</p><p>${address}</p><p>${stopCounter} total stops within a 0.5 mile radius</p><p>${wheelchairCounter} with wheelchair boarding access.</p>`;
      marker.setTitle(newTitle);
      largeInfowindow.marker = marker;
      if (infoClosed) {
        // console.log('Inside the if statement: infowindow is closed.');
        largeInfowindow.setContent(newTitle);
        largeInfowindow.open(map, marker);
        currentlyOpened = true;
      } else {
        if (currentlyOpened) {
          // console.log('Made it to the else statement');
          largeInfowindow.setMarker = null;
          largeInfowindow.marker = marker;
          largeInfowindow.setContent(newTitle);
          largeInfowindow.open(map, marker);
        } else {
          largeInfowindow.setContent(newTitle);
          largeInfowindow.open(map, marker);
          currentlyOpened = true;
        }
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
  // A callback to handle the received response from Google maps' text search service
  function callback(results, status) {
    // console.log(results[0])
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      makeMarker(results[0]);
    } else {
      alert('Could not find any information about your search term.');
      return;
    }
  }
  // A function to search for a place's geolocation info from text
  function pinPlace(searchText) {
    var service = new google.maps.places.PlacesService(map);
    var request = {
      query: searchText.toLowerCase()
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
    }
  }
  // An event handler that grabs the submitted search text and passes it to pinPlace
  document.querySelector("form").addEventListener('submit', function(event) {
    event.preventDefault();
    hideMarkers();
    // map.setZoom(13);
    var searchText = document.querySelector("#searchtxt").value;
    if (searchText === "" || !searchText) {
      alert("Cannot submit form with empty search text.");
      return;
    }
    pinPlace(searchText);
  });
  map.fitBounds(bounds);
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