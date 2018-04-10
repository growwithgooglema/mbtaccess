function getDistanceBetweenTwoPoints (pt1, pt2) {
  /**
   * Uses the Haversine forumla to get distance between two points.
   *
   *  Each point should have two attributes: lat and lon. The 
   *  function will then use the Haversine forumla to calculate
   *  the distance between the two points in km. 
   *
   * @param {map} pt1 The lat and lon of the first point
   * @param {map} pt2 The lat and lon of the second point
   *
   * @return {float} The distance between the two points in km.
   */
  //https://www.movable-type.co.uk/scripts/latlong.html
  //https://rosettacode.org/wiki/Haversine_formula#ES6
  if (pt1 === pt2) {
    return 0;
  }

  // Haversine formula
  const R = 6372.8; // Radius of the Earth in km
  const lat1 = toRadians(pt1.lat);
  const lat2 = toRadians(pt2.lat);
  const lon1 = toRadians(pt1.lon);
  const lon2 = toRadians(pt2.lon);

  const deltaLat = lat2-lat1;
  const deltaLon = lon2-lon1;

  const a = Math.pow(Math.sin(deltaLat/2), 2) +
    Math.pow(Math.sin(deltaLon/2), 2) * 
    Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.asin(Math.sqrt(a)) * 100;

  const d = (R * c) / 100;

  return d; 
}

function toRadians (n) {
  return (n * (Math.PI / 180));
}

// module.exports = getDistanceBetweenTwoPoints;