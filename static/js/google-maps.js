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
      let marker = new google.maps.Marker({
        map: map,
        position: pos,
        label: '★'
      })
      map.setCenter(pos)
      infoWindow.setPosition(pos)
      infoWindow.setContent('You')
      infoWindow.open(map, marker)
      const query = fetch(`http://localhost:5000/stops?lat=${pos.lat}&lon=${pos.lng}`)
      const data = await (await query).json()
      const stops = data.stops
      // Create markers and set infoWindow content for each marker
      const markersArray = []
      const createMarkers = stops.forEach(stop => {
        let marker = new google.maps.Marker({
          map: map,
          position: {lat: stop.latitude, lng: stop.longitude},
          name: `${stop.name}`,
          googleUrl: `https://www.google.com/maps/dir/?api=1&origin=${pos.lat},${pos.lng}&destination=${stop.latitude},${stop.longitude}&travelmode=walking`,
          animation: google.maps.Animation.DROP,
          clickMarker: marker => google.maps.event.trigger(marker, 'click')
        })
        marker.addListener('click', () => {
          marker.setAnimation(google.maps.Animation.BOUNCE)
          setTimeout(() => marker.setAnimation(null), 1000)
          infoWindow.setContent(
            `<div id="info-window-content">
              <header>
                <strong>${stop.name}</strong>
              </header>
              <div><a href="${marker.googleUrl}">View on Google Maps</a></div>
            </div>`)
          infoWindow.open(map, marker)
        })
        bounds.extend(marker.position)
        map.fitBounds(bounds)
        markersArray.push(marker)
      })
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
