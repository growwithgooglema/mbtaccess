#!/usr/bin/env python3
"""
Migration script to load data models from models.py into database tables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"""
import os
from flask import Flask

from models import db, Stop


def main():
    """Load Stop data model to a database table"""
    app = Flask(__name__)
    if os.environ.get('DBASE_URL'):
        db_url = os.environ.get('DBASE_URL')
    else:
        db_url = "sqlite:///{p}".format(
            p=os.path.join(os.path.dirname(__file__), "test_database.sqlite")
        )
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    app.app_context().push()
    db.drop_all()
    db.create_all()
    all_stops = Stop.from_api("https://api-v3.mbta.com/stops")
    db.session.bulk_save_objects(all_stops)
    db.session.commit()
    print("Done loading data")


if __name__ == '__main__':
    main()
