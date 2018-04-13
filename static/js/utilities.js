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
  if (typeof(pt1.lat) == 'undefined' ||
      typeof(pt1.lon) == 'undefined' ||
      typeof(pt2.lat) == 'undefined' ||
      typeof(pt2.lon) == 'undefined') {
    throw new TypeError('One of the arguments is missing the lat or lon field');
  }

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

function getAllPointsInRadius (centerPt, pts, radius) {
  /**
   *  Gets a list of all points within a radius of a given point.
   *
   *  This function uses the getDistanceBetweenTwoPoints() method to 
   *  retrieve a list of all points from a given list of points that
   *  are within a given radius.
   *
   *  @param {map}  centerPt  The point from which all other points are compared
   *  to determine if they are within the given raddius. Should have a lat and
   *  lon attributes which have ints as values.
   *  @param {array}  pts  An array of points formatted in the same manner as
   *  the center point. These points are tested for distance to the center point.
   *  Points within the given radius are returned.
   *  @param {int}  radius  The distance (in km) from which all other points are
   *  compared.
   *
   * @return  {array} A list which contains all the points from pts that are
   *  within the radius from the centerPt.
   */
  ptsInRadius = [];
  pts.forEach( function (element) {
    if (getDistanceBetweenTwoPoints(centerPt, element) <= radius) {
      ptsInRadius.push(element);
    }
  });
  return ptsInRadius;
}
/*
module.exports = {
  getDistanceBetweenTwoPoints,
  getAllPointsInRadius,
};
*/
