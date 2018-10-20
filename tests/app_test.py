"""
Unit test module for the Flask application in app.py
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"""
import json
import os
import sys
import unittest

test_dir = os.path.dirname(os.path.abspath(__file__))
main_dir = os.path.dirname(test_dir)
sys.path.extend([test_dir, main_dir])

from app import app, db


if os.environ.get('DBASE_URL'):
    db_url = os.environ.get('DBASE_URL')
else:
    db_url = 'sqlite:///{p}'.format(p=os.path.join(main_dir, 'stops.sqlite'))


class AppTest(unittest.TestCase):
    """Test all app endpoints. Assumes local database tables have been populated."""

    def setUp(self):
        """Set up test variables"""
        app.app_context().push()
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = db_url
        self.client = app.test_client()

    def tearDown(self):
        """Close the database connection and pop the app client"""
        db.session.close()

    def test_codes(self):
        """Test status codes for app endpoints"""
        endpoints = {
            'index.html': 404,
            '/': 200,
            '/sw.js': 200,
            '/universities.html': 404,
            '/universities': 200,
            '/data/cleaner_universities.json': 404,
            '/universities/data': 200,
            '/stops?lat=42.35947&lon=-71.09296': 200,
            '/stop/5': 200,
        }
        for e, exp in endpoints.items():
            with self.subTest('Testing endpoint {e}'.format(e=e), end=e, expect=exp):
                self.assertEqual(self.client.get(e).status_code, exp)

    def test_stop(self):
        """Test stop endpoints for the given MBTA stop IDs"""
        endpoints = {
            '/stop/bad': 'bad',
            '/stop/2': 'good',
            '/stop/1000': 'bad',
            '/stop/225': 'good',
        }
        for e, exp in endpoints.items():
            with self.subTest('Testing API endpoint {e}'.format(e=e), end=e, expect=exp):
                data = json.loads(self.client.get(e).data.decode('utf8'))
                self.assertEqual(data.get('status'), exp)

    def test_stops(self):
        """Test the stops endpoint, which expects query strings."""
        endpoints = {
            '/stops?lat=42.35947&lon=-71.09296': 'good',
            '/stops?lat=42.36947&lon=-71.08296': 'good',
            '/stops?lat=bad&lon=bad': 'bad',
            '/stops?lat=420.35947&lon=-710.09296': 'bad'
        }
        for e, exp in endpoints.items():
            with self.subTest('Testing API endpoint {e}'.format(e=e), end=e, expect=exp):
                data = json.loads(self.client.get(e).data.decode('utf8'))
                # Test for equality
                self.assertEqual(data.get('status'), exp)
                # Also, test that if the status is good, then stops is not empty.
                # However, if status is not good, then stops must be empty
                self.assertTrue((data.get('status') == 'good') == bool(data.get('stops')))


if __name__ == '__main__':
    unittest.main()
