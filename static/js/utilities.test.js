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
  
  expect(dis.getDistanceBetweenTwoPoints(pt1, pt2)).toBe(0);
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

  const result = dis.getDistanceBetweenTwoPoints(pt1, pt2)
  expect(result).toBeGreaterThan(100)
  expect(result).toBeLessThan(105)
});

test('1 degree away gives correct distance in miles', () => {
  const pt1 = {
    lat: 20,
    lon: 20,
  }
  const pt2 = {
    lat: 20,
    lon: 21,
  }

  const result = dis.getDistanceBetweenTwoPoints(pt1, pt2, 'm')
  expect(result).toBeGreaterThan(62)
  expect(result).toBeLessThan(65)
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
  const result = dis.getDistanceBetweenTwoPoints(pt1, pt2)

  expect(result).toBeGreaterThan(2887)
  expect(result).toBeLessThan(2888)
});

test('test example from previous url in miles', () => {
  const pt1 = {
    lat: 36.12,
    lon: -86.67,
  }
  const pt2 = {
    lat: 33.94,
    lon: -118.40,
  }
  const result = dis.getDistanceBetweenTwoPoints(pt1, pt2, 'm')

  expect(result).toBeGreaterThan(1793)
  expect(result).toBeLessThan(1795)
});

test('calling getDistanceBetweenTwoPoints with faulty arguments throws error', () => {
  const pt1 = {}
  const pt2 = {}

  expect(() => {
    dis.getDistanceBetweenTwoPoints(pt1, pt2)
  }).toThrowError(TypeError);
});

test('point is obviously outside radius', () => {
  const centerPt = {
    lat: 0,
    lon: 0,
  }
  const pts = [
    {
      lat: 20,
      lon: 20,
    }
  ];
  const radius = 1;

  const result = dis.getAllPointsInRadius(centerPt, pts, radius);

  expect(result.length).toBe(0);
});

test('two points in radius, one point out', () => {
  const centerPt = {
    lat: 20,
    lon: 20,
  }

  const pts = [
    {
      lat: 20,
      lon: 21,
    },
    {
      lat: 20,
      lon: 20,
    },
    {
      lat: 0,
      lon: 0,
    }
  ];

  const radius = 110;

  const result = dis.getAllPointsInRadius(centerPt, pts, radius);

  expect(result.length).toBe(2);
});

test('two points in radius, one point out in miles', () => {
  const centerPt = {
    lat: 20,
    lon: 20,
  }

  const pts = [
    {
      lat: 20,
      lon: 21,
    },
    {
      lat: 20,
      lon: 20,
    },
    {
      lat: 0,
      lon: 0,
    }
  ];

  const radius = 110;

  const result = dis.getAllPointsInRadius(centerPt, pts, radius, 'm');

  expect(result.length).toBe(2);
});
