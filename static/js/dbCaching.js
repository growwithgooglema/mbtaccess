/* globals localforage, localStorage */
const dbName = "stopsDB";

localforage.config({
  name: dbName,
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL
  ],
  storeName: "stops",
  version: 1,
  description: 'Local indexedDB cache for MBTA stops metadata'
});

fetch("https://api-v3.mbta.com/stops").then(function(response) {
  if (response.ok) {
    return response.json();
  }
  throw Error("Failed to fetch MBTA stops metadata");
}).then(function(stops) {
  stops.data.forEach(function(mbtaStop) {
    let place = {
      id: mbtaStop.id,
      name: mbtaStop.attributes.name,
      lat: mbtaStop.attributes.latitude,
      lng: mbtaStop.attributes.longitude,
      wheelchair_boarding: mbtaStop.attributes.wheelchair_boarding
    };
    localforage.setItem(place.id, place).then(function(value) {
      // console.log(mbtaStop, " added to the DB.");
    }).catch(function(error) {
      console.log(error, " occured while being saved.");
    });
  });
}).catch(function(error) {
  console.log(`${error.message} occurred during DB processing.`);
});

// localforage.dropInstance({
//   name: dbName,
//   storeName: "stops"
// }).then(function() {
//   console.log('Dropped stops DB.');
// });