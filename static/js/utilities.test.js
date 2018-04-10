const dis = require('./utilities');

test('same point returns 0 distance', () => {
  // Ensure that if the coordinate is given, distance apart is 0
  const pt1 = {
    lat: 20,
    lon: 20,
  }
  const pt2 = {
    lat: 20,
    lon: 20,
  }
  
  expect(dis(pt1, pt2)).toBe(0);
});

test('1 degree away gives correct distance', () => {
  /* Using a third party tool, the distance between these 2 points
   was found to be between 103 and 104 km. Ensure the distance is
   approximately the same.
   */
  const pt1 = {
    lat: 20,
    lon: 20,
  }
  const pt2 = {
    lat: 20,
    lon: 21,
  }

  const result = dis(pt1, pt2)
  expect(result).toBeGreaterThan(100)
  expect(result).toBeLessThan(105)
});

test('test example from https://rosettacode.org/wiki/Haversine_formula#ES6', () => {
  /* Use the example given from the aforementioned link on the Haversine forumla
  */
  const pt1 = {
    lat: 36.12,
    lon: -86.67,
  }
  const pt2 = {
    lat: 33.94,
    lon: -118.40,
  }
  const result = dis(pt1, pt2)

  expect(result).toBeGreaterThan(2887)
  expect(result).toBeLessThan(2888)
});