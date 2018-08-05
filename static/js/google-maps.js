// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MBTAccess map ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
async function initMap () {
  try {
// Initialize Google Map
  const boston = {lat: 42.360091, lng: -71.09416}
  const map = new google.maps.Map(document.getElementById('map'), {
    center: boston,
    zoom: 13
  })
  const bounds = new google.maps.LatLngBounds()
  google.maps.event.addDomListener(window, 'resize', () => map.fitBounds(bounds))
    const infoWindow = new google.maps.InfoWindow()
    // Handle geolocation success and failure
    const success = async position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(pos)
      infoWindow.setPosition(pos)
      infoWindow.setContent('You')
      infoWindow.open(map)
      const query = fetch(`http://localhost:5000/stops?lat=${pos.lat}&lon=${pos.lng}`)
      const data = await (await query).json()
      const stops = data.stops
      console.log('Successfully geolocated user.')
      console.log(`Geolocation:`, pos, `\nStops:`, stops)
    }
    const error = e => console.warn(`ERROR (${e.code}): ${e.message}`)
    // Geolocate user
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error)
    })
  } catch (e) {
    throw Error(e)
  }
}
