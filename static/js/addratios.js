// Script to add wheelchairs-to-number of stops ratios for each entity in populated_universities.json

const https = require('https');
let universities = require('../../data/populated_universities.json');
var editedSchools = [];
let getDistance = require('./utilities');
const stopsUrl = "https://api-v3.mbta.com/stops";

// Get the stops data
console.log("I am here");
(function(url) {
  https.get(url, response => {
    response.setEncoding("utf8");
    let body = '';
    response.on('data', data => {
      body += data;
    });
    response.on('end', () => {
      body = JSON.parse(body);
      if (body.data && body.data.length) {
        for (let school of universities) {
          let stopCount = 0;
          let wheelCount = 0;
          let p1 = {lat: school.lat, lon: school.lng};
          for (let stop of body.data) {
            let p2 = {lat: stop.attributes.latitude, lon: stop.attributes.longitude};
            if (stop.attributes.wheelchair_boarding > 0) {
              wheelCount += 1;
            }
            if (getDistance(p1, p2) <= 1.609344) {
              stopCount += 1;
            }
          }
          school.stops = stopCount;
          school.wheels = wheelCount;
          if (stopCount == 0) {
            school.ratio = 0;
          } else {
            school.ratio = wheelCount/stopCount;
          }
          editedSchools.push(school);
        }
      }
    });
  }).on('error', (e) => {
    console.error(e);
  });
})(stopsUrl);
console.log("I am now here");
while(true) {
  if (editedSchools.length === universities.length) {
    JSON.stringify(editedSchools);
    break;
  }
  // console.log(editedSchools);
}