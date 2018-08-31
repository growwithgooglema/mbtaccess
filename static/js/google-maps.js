// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MBTAccess map ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
async function initMap () {
  try {
    let navLink = document.getElementById('nav-link-index')
    navLink.className = 'nav-link active'
    // Initialize Google Map
    const boston = {lat: 42.360091, lng: -71.09416}
    const map = new google.maps.Map(document.getElementById('map'), {
      center: boston,
      zoom: 13
    })
    const bounds = new google.maps.LatLngBounds()
    google.maps.event.addDomListener(window, 'resize', () => map.fitBounds(bounds))
    const infoWindow = new google.maps.InfoWindow()
    const showStops = async location => {
      // Create map marker and infoWindow at location
      let marker = new google.maps.Marker({
        map: map,
        position: location,
        label: '★'
      })
      map.setCenter(location)
      infoWindow.setPosition(location)
      infoWindow.setContent(location.name)
      infoWindow.open(map, marker)
      // Fetch stops near location from database
      const query = fetch(`stops?lat=${location.lat}&lon=${location.lng}`)
      const data = await (await query).json()
      const stops = data.stops
      if (stops.length !== 0) {
        // Create table that will be populated with stops
        const tableDiv = document.getElementById('stops-table')
        const tableTitle = document.createElement('h2')
        tableTitle.className = 'lead'
        tableTitle.textContent = 'Stop list'
        tableDiv.appendChild(tableTitle)
        const table = document.createElement('table')
        table.className = 'table table-sm table-striped'
        tableDiv.appendChild(table)
        const thead = document.createElement('thead')
        thead.className = 'thead-light'
        table.appendChild(thead)
        const theadRow = document.createElement('tr')
        thead.appendChild(theadRow)
        const thNum = document.createElement('th')
        thNum.textContent = '#'
        thNum.scope = 'col'
        theadRow.appendChild(thNum)
        const thName = document.createElement('th')
        thName.textContent = 'Name'
        thName.scope = 'col'
        theadRow.appendChild(thName)
        const tbody = document.createElement('tbody')
        table.appendChild(tbody)
        // Create markers, infoWindow content, and table rows for each stop
        const markersArray = []
        stops.forEach((stop, i) => {
          // Set stop attributes
          let googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${stop.latitude},${stop.longitude}&travelmode=walking`
          let stopLocation = {lat: stop.latitude, lng: stop.longitude}
          let number = `${i + 1}`
          let name = stop.name
          // Create markers
          let marker = new google.maps.Marker({
            map: map,
            position: stopLocation,
            animation: google.maps.Animation.DROP
          })
          // Set infoWindow content
          marker.addListener('click', () => {
            marker.setAnimation(google.maps.Animation.BOUNCE)
            setTimeout(() => marker.setAnimation(null), 1000)
            infoWindow.setContent(
              `<div id="info-window-content">
                <header>
                  <strong>${number}. ${name}</strong>
                </header>
                <div><a href="${googleUrl}" target="_blank">View on Google Maps</a></div>
              </div>`)
            infoWindow.open(map, marker)
          })
          markersArray.push(marker)
          // Adjust map to fit markers
          bounds.extend(marker.position)
          map.fitBounds(bounds)
          // Fill table with stop data
          let stopRow = document.createElement('tr')
          tbody.appendChild(stopRow)
          let stopRowNum = document.createElement('th')
          stopRowNum.scope = 'row'
          stopRowNum.textContent = number
          stopRow.appendChild(stopRowNum)
          let stopRowName = document.createElement('td')
          if (stop.platform_name) {
            stopRowName.innerHTML = `<a href="${googleUrl}" target="_blank">${name}</a><p>${stop.platform_name}</p>`
          } else {
            stopRowName.innerHTML = `<a href="${googleUrl}" target="_blank">${name}</a>`
          }
          stopRow.appendChild(stopRowName)
        })
        console.log(`Stops:`, stops)
      } else {
        let message = 'No stops returned.'
        let stopsFail = document.createElement('div')
        stopsFail.className = 'alert alert-dismissable alert-danger fade show'
        stopsFail.role = 'alert'
        stopsFail.innerHTML = `
          ${message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        `
        const parentDiv = document.querySelector('#map').parentNode
        const mapDiv = document.querySelector('#map')
        parentDiv.insertBefore(stopsFail, mapDiv)
        console.log(message)
      }
    }
    // Handle geolocation success and failure
    const success = position => {
      let location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        name: 'You'
      }
      console.log(`Successfully geolocated user.\nGeolocation:`, position)
      showStops(location)
    }
    const failure = e => {
      let geoFail = document.createElement('div')
      geoFail.className = 'alert alert-dismissable alert-warning fade show'
      geoFail.role = 'alert'
      geoFail.innerHTML = `
        ${e.message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `
      const parentDiv = document.querySelector('#map').parentNode
      const mapDiv = document.querySelector('#map')
      parentDiv.insertBefore(geoFail, mapDiv)
      console.warn(`ERROR (${e.code}): ${e.message}`)
    }
    // Geolocate user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failure)
    } else {
      let message = 'Geolocation not available in browser.'
      let noGeo = document.createElement('div')
      noGeo.className = 'alert alert-danger'
      noGeo.role = 'alert'
      noGeo.textContent = message
      const parentDiv = document.querySelector('#map').parentNode
      const mapDiv = document.querySelector('#map')
      parentDiv.insertBefore(noGeo, mapDiv)
      console.log(message)
    }
    /*
    TODO: Search input from search box
    document.querySelector('form').addEventListener('submit', event => {
      // TODO: Maybe use Elasticsearch to return instant results as the user types
    })
   */
  } catch (e) {
    throw Error(e)
  }
}
