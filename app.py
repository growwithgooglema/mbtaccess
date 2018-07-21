"""
Flask routing module to generate pages and API endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"""
import json
import os

from flask import Flask, jsonify, make_response, render_template, request

from models import db, Stop


app = Flask(__name__)
if os.environ.get('DBASE_URL'):
    db_url = os.environ.get('DBASE_URL')
else:
    db_url = "sqlite:///{p}".format(p=os.path.join(os.path.dirname(__file__), "test_database.sqlite"))
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.route('/', methods=['GET', 'POST'])
@app.route('/index.html')
def index():
    """App route function for homepage."""
    return render_template('index.html')


@app.route('/universities')
def universities():
    """App route function for universities page."""
    return render_template('universities.html')


@app.route("/sw.js")
def sworker():
    """Serve the app's service worker from here."""
    with open(os.path.join(os.path.dirname(__file__), 'sw.js')) as f:
        contents = f.read()
    resp = make_response(contents)
    resp.mimetype = 'text/javascript'
    return resp


@app.route("/data/cleaner_universities.json")
def cleaner_universities():
    """get to data/cleaner_universities.json"""
    with open(os.path.join(os.path.dirname(__file__), 'data', 'cleaner_universities.json')) as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/stops', methods=['GET'])
def get_stops():
    """Get stops given latitude and longitude."""
    # TODO: Something like /stops?lat=&lon= should point to this function.
    keys = ('lat', 'lon')
    missing = []
    user_info = {}
    for k in keys:
        try:
            user_info[k] = float(request.args.get(k))
        except Exception as excp:
            if k not in request.args:
                missing.append(k)
            print(excp)
            user_info[k] = None
    if any(not v for v in user_info.values()):
        message = 'lat or lon or both could not parsed properly.'
        if missing:
            if len(missing) == 1:
                message += ' {m} is missing from the query string.'.format(m=" and ".join(missing))
            else:
                message += ' Both {m} are missing from the query string.'.format(m=" and ".join(missing))
        message += ' Make sure you\'re using the query stops?lat=value&lon=value.'
        message += ' Also, the values should be floating point values.'
        return jsonify(**{
            'status': 'bad',
            'message': message,
            'stops': []
        })
    stops = []
    for stop in Stop.query.all():
        if stop.within_distance(user_info):
            stops.append(stop.serialize())
    status = 'good' if stops else 'bad'
    if not stops:
        message = 'Could not find stops for the given lat and long'
    else:
        message = '{cnt} stops found'.format(cnt=len(stops))
    return jsonify(**{
        'status': status,
        'message': message,
        'stops': stops
    })


@app.route('/stop/<stop_id>', methods=['GET'])
def get_stop(stop_id):
    """Get an MBTA stop by its assigned ID. Something like /stop/5 should do."""
    match = [stop.serialize() for stop in Stop.query.filter_by(stop_id=stop_id).all()]
    status = 'good' if match else 'bad'
    if match:
        message = 'A stop matching the given ID is found'
    else:
        message = 'No stop found for the provided ID.'
    return jsonify(**{
        'status': status,
        'message': message,
        'stops': match
    })


if __name__ == '__main__':
    app.run(port=os.environ.get('APP_PORT') or 5000, debug=True)
