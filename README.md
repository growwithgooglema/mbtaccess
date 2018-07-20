# README

[Grow with Google - New England](https://github.com/growwithgooglema) collaborative project

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Contributing](#contributing)
- [Application stack](#application-stack)
  - [Flask](#flask)
  - [Docker](#docker)
  - [Front-end](#front-end)
- [Maintainers](#maintainers)

## Description

This app integrates the Google Maps and MBTA (Massachusetts Bay Transportation Authority) APIs to provide wheelchair accessibility data for MBTA stops.

MBTA recently released their [MBTA V3 API](https://api-v3.mbta.com/) that provides public transportation data in JSON API format. One of the under-utilized datasets in their API is the wheelchair accessibility of the stops. Google Maps [recently started](http://fortune.com/2018/03/15/google-maps-wheelchair-accessible-routes/) providing wheelchair accessibility info, but the implementation is not particularly extensive.

**We aim to create a web app that quickly and conveniently identifies wheelchair accessible stops near the user.**

## Contributing

- This is a collaborative open-source project by members of @growwithgooglema/mbtaccess.
- We have a [team discussion board](https://github.com/orgs/growwithgooglema/teams/mbtaccess).
- Please behave according to the [Code of Conduct](CODE_OF_CONDUCT.md).
- Please review the [instructions for contributing](CONTRIBUTING.md).
- We are developing on the `dev` branch.

## Application stack

### Flask

#### Flask summary

- The application originally fetched JSON data directly from the MBTA API, and then used client-side JavaScript to iterate over the stops and drop map pins for stops near the user.
- After experiencing slow speeds, we rebuilt our app with [Python 3](https://docs.python.org/3/) and the Python framework [Flask](http://flask.pocoo.org/). Instead of fetching data directly from MBTA, we store data in our own back-end database API. We then perform the calculations with Python and structure the application with Flask. Python code has been formatted according to the [PEP 8](http://pep8.org/) specification, with line length extended to 120 characters.
- [utilities.py](utilities.py) contains distance calculation functions. The `get_distance` function uses the [Haversine formula](https://rosettacode.org/wiki/Haversine_formula#Python) to calculate the distance between two points, such as between the user's location and an MBTA stop.
- models.py
- [migrate.py](migrate.py) creates a database, fetches data from the MBTA API, and stores it in the database.
- [app.py](app.py) contains the main Flask application code. This file controls the app, with Flask routing functions to render the pages of the web application and access app content. The database is accessed by [SQLAlchemy](http://www.sqlalchemy.org/) from within [app.py](app.py).

#### Running Flask

The application should run within a virtual environment. Python 3 is bundled with the `venv` module for creation of virtual environments.

1. **Install Python virtual environment and requirements**: The following shell commands will create a Python virtual environment, activate the virtual environment and display a modified virtual environment prompt, and install required modules listed in requirements.txt.

    ```sh
    cd mbtaccess
    python3 -m venv venv
    # activate virtual env
    . venv/bin/activate
    # install modules listed in requirements.txt
    (venv) <PATH> pip install -r requirements.txt
    ```

2. **Set up database**: Run `python migrate.py` from within the virtual environment. This needs to be run only once to populate the `mbta_stops` table in a DB called `test_database.sqlite`.
3. **Start application**: Run `python app.py` from within the virtual environment. Flask will start a local web server.
    - Flask, by default, will bind the application to port 5000. If you wish to change this, you can export an `APP_PORT` environment variable and call the script:

      ```py
      export APP_PORT=7000 && python app.py
      ```

4. **Test the back-end API locally**: In a web browser, navigate to [http://127.0.0.1:5000/stops?lat=42.35947&lon=-71.09296](http://127.0.0.1:5000/stops?lat=42.35947&lon=-71.09296) to see the data returned from the API. If you're adventurous, change the values for `lat` and `lon` in the query string to see new results.
    - The API endpoints have not yet been hosted anywhere. The only way to test them is to run the application locally.
    - The goal is to deploy the API endpoints to Google Cloud.
5. **Test the app pages locally**: Navigate to [index.html](http://127.0.0.1:5000) and [universities.html](http://127.0.0.1:5000/universities.html)

### Docker

The application is assembled into a Docker container, and is available as a container image on Docker Hub. Docker Hub rebuilds the container after each commit to the `master` branch.

1. **Pull Docker container image**:

    ```sh
    docker pull growwithgooglema/gwg-mbta:latest
    ```

2. **Run Docker container locally**:

    ```sh
    docker run -d -p 80:8000 growwithgooglema/gwg-mbta:latest
    ```

    - `-p 80:8000` maps the http port 80 from your local machine to port 8000 on the container.
    - Local ports other than 80 can be used.
    - Container ports other than 8000 can be used if the Dockerfile is modified for the new http server listener port.

3. **Run application**: To check if the application is running correctly, open a web browser and navigate to [http://localhost:80](http://localhost:80).

### Front-end

- The application pages are styled with [Bootstrap 4](https://getbootstrap.com), a library of HTML, CSS, and JavaScript components.
- Markdown documents in the repository have been formatted in a standard style, based on suggestions from [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint).

<!--
TODO update the file list after rebuilding the app with Flask

## Repository contents

- [data/](data): Code for gathering application data.
- [static/](static): CSS, image, and JavaScript files for the application.
  - [css/](static/css)
    - [custom.css](static/css/custom.css): Custom CSS for the app, in addition to Bootstrap.
  - [img/](static/img)
  - [js/](static/js)
    - [addratios.js](static/js/addratios.js)
    - [dbCaching.js](static/js/dbCaching.js)
    - [google-maps.js](static/js/google-maps.js)
    - [index.js](static/js/index.js)
    - [localforage.min.js](static/js/localforage.min.js)
    - [map.js](static/js/map.js)
    - [school.js](static/js/school.js)
    - [utilities.js](static/js/utilities.js): Calculates distances in order to display stop information based on the location searched.
    - [utilities.test.js](static/js/utilities.test.js)
- [.gitignore](.gitignore): Instructions to Git to exclude certain files from commits.
- [.jshintrc](.jshintrc)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md): Guidelines for conduct.
- [CONTRIBUTING.md](CONTRIBUTING.md): Instructions for contributing to the repository.
- [Dockerfile](Dockerfile): Instructions for Docker container builds.
- [get_university_list.py](get_university_list.py):
- [index.html](index.html): The application homepage.
- [LICENSE](LICENSE): This file describes how the repository can be used by others. We have provided the repository under the MIT license, a permissive and widely-used license. See the [choose a license page](https://choosealicense.com/) for more info on licenses.
- [package-lock.json](package-lock.json):
- [package.json](package.json):
- [README.md](README.md): This file, a concise description of the repository.
- [sw.js](sw.js): This is the Service Worker file. Service Worker is a JavaScript file that sits between the browser and network requests. It helps to coordinate retrieval of information from the network and cache.
- [universities.html](universities.html): This is the webpage that shows the table with university accessibility data.
- [utilities.py](utilities.py): Python module with helper functions for the application. The functions calculate distances in order to display stop information based on the location searched.
 -->

## Maintainers

- [@AbdouSeck](https://github.com/AbdouSeck)
  - **Chief Data Wrangler**
  - **Friendly DevOps**
  - **Location Services**
- [@br3ndonland](https://github.com/br3ndonland)
  - **Nominated Benevolent Dictator**
  - **Dr. Documentation**
  - **Master of Markdown**
- [@jethridge13](https://github.com/jethridge13)
  - **Cartesian Contributor**
  - **Interstate Transportation Logistics**
- [@KonradSchieban](https://github.com/KonradSchieban)
  - **Cloudmaster**
  - **The Dockerizer**
