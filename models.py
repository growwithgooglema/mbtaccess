"""
DB module for generating a Stop data model, along with future data models
"""
from flask_sqlalchemy import SQLAlchemy

from utilities import get_stops, get_distance


db = SQLAlchemy()


class Stop(db.Model):
    """
    MBTA stop data model
    """
    __tablename__ = 'mbta_stops'
    stop_id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), primary_key=True)
    description = db.Column(db.String(200), nullable=True)
    address = db.Column(db.String(100), nullable=True)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    platform_code = db.Column(db.String(10), nullable=True)
    platform_name = db.Column(db.String(100), nullable=True)
    location_type = db.Column(db.Integer, nullable=True)
    wheelchair_boarding = db.Column(db.Integer, nullable=True)

    def __init__(self, stop_id, name, description, address, longitude, latitude,
                 platform_code, platform_name, location_type, wheelchair_boarding):
        """
        Initialize a Stop object

        :param stop_id: The ID of the stop (Some values are integers while others are strings)
        :type: str

        :param name: Name of the stop
        :type: str

        :param description: Description given to the stop by the MBTA
        :type: str

        :param address: The address associated with the stop
        :type: str

        :param longitude: Longitude of the stop
        :type: float

        :param latitude: Latitude of the stop
        :type: float

        :param platform_code: The code given to the platform associated with the stop
        :type: int or None

        :param platform_name: The name given to the platform associated with the stop
        :type: str or None

        :param location_type: The MBTA type of location
        :type: int or None

        :param wheelchair_boarding: Whether it's wheelchair accessible (0=False; 1=True)
        :type: int

        :return: Returns a Stop object
        :rtype: Stop
        """
        self.stop_id = stop_id
        self.name = name
        self.description = description
        self.address = address
        self.longitude = longitude
        self.latitude = latitude
        self.platform_code = platform_code
        self.platform_name = platform_name
        self.location_type = int(location_type) if location_type else None
        self.wheelchair_boarding = int(wheelchair_boarding) if wheelchair_boarding else None

    def within_distance(self, point, distance=(1.609344)/2.0):
        """
        Returns True if the distance between `self` and `point`
        is less than or equal to half a mile.

        :param point: a python dictionary with keys lat and lon corresponding to a geo position
        :type: dict

        :param distance: Default value is (1.609344)/2.0, which is half a mile
        :type: float

        :return: True or False
        :rtype: bool
        """
        d = {'lat': self.latitude, 'lon': self.longitude}
        return get_distance(d, point) <= distance

    @classmethod
    def from_api(cls, url):
        """
        Given the URL endpoint to the MBTA stops API,
        the function should fetch all the stops and generate Stop
        objects with said stops.

        :param url: The endpoint for the stops API
        :type: str

        :return: Returns a list of Stop objects
        :rtype: list
        """
        output = []
        stops = get_stops(url)
        for stop in stops:
            d = {'stop_id': stop.get('id')}
            for k, v in stop.get('attributes').items():
                d[k] = v
            output.append(cls(**d))
        return output

    def serialize(self):
        """
        Provide a method for serializing this object
        """
        return {
            'stop_id': self.stop_id,
            'name': self.name,
            'address': self.address,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'platform_code': self.platform_code,
            'platform_name': self.platform_name,
            'location_type': self.location_type,
            'wheelchair_boarding': self.wheelchair_boarding,
        }
