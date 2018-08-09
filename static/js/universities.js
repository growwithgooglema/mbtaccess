// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MBTAccess universities page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
async function initMap () {
  try {
    let navLink = document.getElementById('nav-link-universities')
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
    // Fetch university data
    const query = fetch('data/cleaner_universities.json')
    const universities = await (await query).json()
    // Create table that will be populated with universities
    const tableDiv = document.getElementById('universities-table')
    const tableTitle = document.createElement('h2')
    tableTitle.className = 'lead'
    tableTitle.textContent = 'Wheelchair-accessible MBTA stops at universities'
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
    const thStopTotal = document.createElement('th')
    thStopTotal.textContent = 'Total'
    thStopTotal.scope = 'col'
    theadRow.appendChild(thStopTotal)
    const thStopWheelchair = document.createElement('th')
    thStopWheelchair.textContent = 'Accessible'
    thStopWheelchair.scope = 'col'
    theadRow.appendChild(thStopWheelchair)
    const thStopRatio = document.createElement('th')
    thStopRatio.textContent = 'Ratio'
    thStopTotal.scope = 'col'
    theadRow.appendChild(thStopRatio)
    const tbody = document.createElement('tbody')
    table.appendChild(tbody)
    // Create markers, infoWindow content, and table rows for each university
    const markersArray = []
    universities.forEach((university, i) => {
      // Set university attributes
      let universityLocation = {lat: university.lat, lng: university.lng}
      let number = `${i + 1}`
      let name = university.name
      let googleUrl = `https://www.google.com/maps/search/?api=1&query=${name.toLowerCase().replace(/[\s-]/g, '+').replace(/[^a-zA-Z+\s]/g, '')}`
      let stopTotal = university.stops
      let stopWheelchair = university.wheelchairs
      let stopRatio = university.ratio
      // Create markers
      let marker = new google.maps.Marker({
        map: map,
        position: universityLocation,
        label: number
      })
      // Set infoWindow content
      marker.addListener('click', () => {
        setTimeout(() => marker.setAnimation(null), 1000)
        infoWindow.setContent(
          `<div id="info-window-content">
            <header>
              <strong>${number}. ${name}</strong>
            </header>
            <div><a href="${googleUrl}">View on Google Maps</a></div>
          </div>`)
        infoWindow.open(map, marker)
      })
      markersArray.push(marker)
      // Adjust map to fit markers
      bounds.extend(marker.position)
      map.fitBounds(bounds)
      // Fill table with university data
      let universityRow = document.createElement('tr')
      tbody.appendChild(universityRow)
      let universityRowNum = document.createElement('th')
      universityRowNum.scope = 'row'
      universityRowNum.textContent = number
      universityRow.appendChild(universityRowNum)
      let universityRowName = document.createElement('td')
      universityRowName.innerHTML = `<a href="${googleUrl}">${name}</a>`
      universityRow.appendChild(universityRowName)
      let universityRowStopTotal = document.createElement('td')
      universityRowStopTotal.textContent = stopTotal
      universityRow.appendChild(universityRowStopTotal)
      let universityRowStopWheelchair = document.createElement('td')
      universityRowStopWheelchair.textContent = stopWheelchair
      universityRow.appendChild(universityRowStopWheelchair)
      let universityRowStopRatio = document.createElement('td')
      universityRowStopRatio.textContent = stopRatio
      universityRow.appendChild(universityRowStopRatio)
    })
    console.log(`Universities:`, universities)
  } catch (e) {
    throw Error(e)
  }
}
