"""
Unit test module for utilities.py
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"""
import json
import os
import sys
import unittest

test_dir = os.path.dirname(os.path.abspath(__file__))
main_dir = os.path.dirname(test_dir)
sys.path.extend([test_dir, main_dir])

import utilities as utils


class UtilitiesTest(unittest.TestCase):
    """Test utility functions"""

    def setUp(self):
        """Set up test variables"""
        self.bad_url = "https://api-v3.mbta.com/stopping"
        self.good_url = "https://api-v3.mbta.com/stops"
        self.good_path = os.path.join(main_dir, "data", "universities.json")
        self.bad_path = os.path.join(main_dir, "data", "bad_universities.json")
        self.point1 = {'lat': 42.36947, 'lon': -71.08296}
        self.point2 = {'lat': 41.76947, 'lon': -72.12296}

    def test_bad_get_stops(self):
        """Test utils.get_stops with a bad URL"""
        with self.assertRaises(utils.BadUrlError):
            utils.get_stops(self.bad_url)

    def test_good_get_stops(self):
        """Test utils.get_stops with a good URL"""
        result = utils.get_stops(self.good_url)
        self.assertIsInstance(result, list)
        self.assertTrue(all(isinstance(v, dict) for v in result))

    def test_bad_process_schools(self):
        """Test utils.process_schools with a bad path name to the json file"""
        with self.assertRaises(Exception):
            utils.process_schools(self.bad_path, self.good_url)
        with self.assertRaises(Exception):
            utils.process_schools(self.good_path, self.bad_url)

    def test_good_process_schools(self):
        """Test utils.process_schools with a bad path name to the json file"""
        result = json.loads(utils.process_schools(self.good_path, self.good_url))
        self.assertIsInstance(result, list)
        self.assertTrue(all(isinstance(v, dict) for v in result))
        self.assertTrue(all('ratio' in v and 'stops' in v for v in result))

    def test_get_distance(self):
        """Test utils.get_distance"""
        self.assertGreater(utils.get_distance(self.point1, self.point2), 0)
        self.assertEqual(utils.get_distance(self.point1, self.point1), 0)
        self.assertEqual(utils.get_distance(self.point2, self.point2), 0)
        first = utils.get_distance(self.point1, self.point2)
        second = utils.get_distance(self.point2, self.point1)
        self.assertEqual(first, second)


if __name__ == '__main__':
    unittest.main()
