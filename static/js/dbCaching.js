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

let uniStore = localforage.createInstance({
  name: dbName,
  storeName: 'universities'
});

// localforage.config({
//   name: dbName,
//   driver: [
//     localforage.INDEXEDDB,
//     localforage.WEBSQL
//   ],
//   storeName: "universities",
//   version: 1,
//   description: 'Local indexedDB cache for local universities metadata'
// });

fetch('data/cleaner_universities.json').then(function(response) {
  if (response.ok) {
    return response.json();
  }
  throw Error("Failed to fetch Massachusetts universities data.");
}).then(function(schools) {
  schools.forEach(function(school) {
    let place = {
      name: school.name,
      address: school.street,
      lat: school.lat,
      lng: school.lng,
      stops: school.stops,
      wheelchairs: school.wheelchairs,
      ratio: school.ratio
    };
    uniStore.setItem(place.name, place).then(function(value) {
      // console.log(value, ' added.');
    }).catch(function(err) {
      console.log(`Could not ${school.name} because ${err}.`);
    });
  });
}).catch(function(err) {
  console.log(`${err.message} occurred during DB processing.`);
});

// localforage.dropInstance({
//   name: dbName,
//   storeName: "stops"
// }).then(function() {
//   console.log('Dropped stops DB.');
// });

// localforage.dropInstance({
//   name: dbName,
//   storeName: "universities"
// }).then(function() {
//   console.log('Dropped universities DB.');
// });