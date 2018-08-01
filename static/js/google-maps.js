// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MBTAccess map ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// Initialize Google Map
function initMap () {
  const boston = {lat: 42.360091, lng: -71.09416}
  const map = new google.maps.Map(document.getElementById('map'), {
    center: boston,
    zoom: 13
  })
  const bounds = new google.maps.LatLngBounds()
  google.maps.event.addDomListener(window, 'resize', () => map.fitBounds(bounds))
}
