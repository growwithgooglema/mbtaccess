// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MBTAccess universities page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
async function initMap () {
  try {
    let navLink = document.getElementById('nav-link-universities')
    navLink.className = 'nav-link active'
    // Initialize Google Map
    const mapCenter = {lat: 42.360091, lng: -71.09416}
    const map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      zoom: 10
    })
    const bounds = new google.maps.LatLngBounds()
    google.maps.event.addDomListener(window, 'resize', () => map.fitBounds(bounds))
    const infoWindow = new google.maps.InfoWindow()
    // Fetch university data
    const query = fetch('universities/data')
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
    thStopWheelchair.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <circle cx="12" cy="4" r="2"/>
        <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z"/>
      </svg>
    `
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
      let stopRatio = university.ratio.toFixed(2)
      // Create markers
      let marker = new google.maps.Marker({
        map: map,
        position: universityLocation,
        label: number
      })
      // Set infoWindow content
      marker.addListener('click', () => {
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
      // Fill table with university data
      let universityRow = document.createElement('tr')
      tbody.appendChild(universityRow)
      let universityRowNum = document.createElement('th')
      universityRowNum.scope = 'row'
      universityRowNum.textContent = number
      universityRow.appendChild(universityRowNum)
      let universityRowName = document.createElement('td')
      universityRowName.innerHTML = `<a href="${googleUrl}" target="_blank">${name}</a>`
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
