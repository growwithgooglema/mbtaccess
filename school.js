// This is supposed to script to define a Place class/prototype

let https = require('https');

const token = process.env.GMAPS_API;

class Place {
  constructor({ name = null, street = null, placeID = null, lat = null, long = null } = {}) {
    this.name = name;
    this.street = street;
    this.placeID = placeID;
    this.lat = lat;
    this.long = long;
  }

  getStreet() {
    return this.street;
  }

  getLat() {
    return this.lat;
  }

  getLong() {
    return this.long;
  }

  getPlaceID() {
    return this.placeID;
  }

  setStreet(val) {
    this.street = val;
  }

  setLat(val) {
    this.lat = val;
  }

  setLong(val) {
    this.long = val;
  }

  setPlaceID(val) {
    this.placeID = val;
  }

  populateAttributes() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.name.replace(' ', '+')}&key=${token}`;
    https.get(url, response => {
      let body = "";
      response.on("data", data => {
        body += data;
      });
      response.on("end", () => {
        body = JSON.parse(body);
        this.setStreet(body.results[0].formatted_address);
        this.setPlaceID(body.results[0].place_id);
        this.setLat(body.results[0].geometry.location.lat);
        this.setLong(body.results[0].geometry.location.lng);
        // console.log(this);
      });
    }).on("error", (e) => {
      console.error(e);
    });
    // console.log(this);
  }

  // Get the MBTA bus stops within a 1 mile radius
  getStops() {
    // Point this call to an API with lat=this.lat&long=this.long&radius=1
  }

  toString() {
    return `Name: ${this.name}\nStreet Address: ${this.street}\nLatitute: ${this.lat} N\nLongitude: ${this.long} W.`;
  }
}

let mit = new Place({
  name: 'Massachusetts Institute of Technology',
  street: '77 Massachusetts Avenue, Cambridge, MA 02139',
  lat: 42.36,
  long: -71.092
});

mit.populateAttributes();
setTimeout(function () {
  console.log(mit);
}, 1000);
console.log(mit);