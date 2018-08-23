# README

[Grow with Google - New England](https://github.com/growwithgooglema) collaborative project

[![license](https://img.shields.io/badge/license-MIT-blue.svg?longCache=true&style=for-the-badge)](https://choosealicense.com/)

[![Travis (.org)](https://img.shields.io/travis/growwithgooglema/mbtaccess.svg?longCache=true&style=for-the-badge)](https://travis-ci.org/growwithgooglema/mbtaccess)

## Table of Contents <!-- omit in toc -->

- [Description](#description)
- [Contributing](#contributing)
- [Application stack](#application-stack)
  - [Front-end](#front-end)
  - [Flask](#flask)
  - [Testing](#testing)
  - [Continuous Integration](#continuous-integration)
  - [Docker](#docker)
- [Repository contents](#repository-contents)
- [Maintainers](#maintainers)

## Description

This app integrates the Google Maps and MBTA (Massachusetts Bay Transportation Authority) APIs to provide wheelchair accessibility data for MBTA stops.

MBTA recently released their [MBTA V3 API](https://api-v3.mbta.com/) that provides public transportation data in JSON API format. One of the under-utilized datasets in their API is the wheelchair accessibility of the stops. Google Maps [recently started](http://fortune.com/2018/03/15/google-maps-wheelchair-accessible-routes/) providing wheelchair accessibility info, but the implementation is not particularly extensive.

**We aim to create a web app that quickly and conveniently identifies wheelchair accessible stops near the user.**

## Contributing

- **Please review the [instructions for contributing](CONTRIBUTING.md).**
- **Please behave according to the [Code of Conduct](CODE_OF_CONDUCT.md).**
- This is a collaborative open-source project by members of @growwithgooglema/mbtaccess. We have a [team discussion board](https://github.com/orgs/growwithgooglema/teams/mbtaccess) where we post announcements and meeting notes.

## Application stack

### Front-end

- The application pages are styled with [Bootstrap 4](https://getbootstrap.com), a library of HTML, CSS, and JavaScript components.
- Markdown documents in the repository have been formatted in a standard style, based on suggestions from [vscode-markdownlint](https://github.com/DavidAnson/vscode-markdownlint).
- The icon is from [Google Material Design](https://material.io/tools/icons) and is available under [Apache license version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html).

### Flask

#### Flask summary

- The application fetches data from the [MBTA V3 API](https://api-v3.mbta.com/).
  - The API conforms to the [General Transit Feed Specification](http://gtfs.org/).
  - The `wheelchair_boarding` attribute can have a value of `0`, `1`, or `2`.
    - 0: No information
    - 1: Accessible
    - 2: Inaccessible
  - See the [MBTA V3 API documentation](https://api-v3.mbta.com/docs/swagger/index.html) for further information.
- The application originally fetched JSON data directly from the MBTA API, and then used client-side JavaScript to iterate over the stops and drop map pins for stops near the user.
- After experiencing slow speeds, we rebuilt our app with [Python 3](https://docs.python.org/3/) and the Python framework [Flask](http://flask.pocoo.org/). Instead of fetching data directly from MBTA, we store data in our own back-end database API. We then perform the calculations with Python and structure the application with Flask. Python code has been formatted according to the [PEP 8](http://pep8.org/) specification, with line length extended to 100 characters.
- [utilities.py](utilities.py) contains distance calculation functions. The `get_distance` function uses the [Haversine formula](https://rosettacode.org/wiki/Haversine_formula#Python) to calculate the distance between two points, such as between the user's location and an MBTA stop.
- [models.py](models.py) sets up the data model for the MBTA stop data.
- [migrate.py](migrate.py) creates a database, fetches data from the MBTA API, and stores it in the database.
- [app.py](app.py) contains the main Flask application code. This file controls the app, with Flask routing functions to render the pages of the web application and access app content. The database is accessed by [SQLAlchemy](http://www.sqlalchemy.org/) from within [app.py](app.py).
- App pages are templated and stored in the [templates](templates) directory. Code common to all application pages is stored in `{% include %}`, and code unique to each page is stored in `{% block %}` content.

#### Running Flask

The Flask application should run within a virtual environment. Python 3 is bundled with the `venv` module for creation of virtual environments.

1. **Install and activate Python virtual environment**: The shell commands in the code block below will create a Python virtual environment, activate the virtual environment and display a modified virtual environment prompt
2. **Install required Python modules into the virtual environment**: Use `pip` to install required modules listed in *requirements.txt*. The modules will be installed locally within the virtual environment. The *requirements.txt* file was generated by running `pip freeze > requirements.txt`.
3. **Set up database**: Run `python migrate.py` from within the virtual environment. This needs to be run only once to populate the `mbta_stops` table in the SQLite database.
4. **Start application**: Run `python app.py` or `python -m flask run` from within the virtual environment. Flask will start a local web server.

    ```sh
    cd mbtaccess
    # 1. install and activate virtual env
    python3 -m venv venv
    . venv/bin/activate
    # 2. install modules
    (venv) <path> $ pip install -r requirements.txt
    # 3. set up database once
    (venv) <path> $ python migrate.py
    # 4. run app
    (venv) <path> $ python app.py
    ```

    - [Using Flask in VS Code](https://code.visualstudio.com/docs/python/tutorial-flask):
      - *Command Palette -> Python: Select Interpreter*. Select virtual environment.
      - *Command Palette -> Python: Create Terminal*. Creates a terminal and automatically activates the virtual environment. Using the Python: Create Terminal command is preferred. Simply creating a new terminal window will not activate the virtual environment.
    - Flask, by default, will bind the application to port 5000. If you wish to change this, you can export an `APP_PORT` environment variable and call the script:

      ```py
      export APP_PORT=7000 && python app.py
      ```

5. **Test the back-end API locally**: In a web browser, navigate to [http://127.0.0.1:5000/stops?lat=42.35947&lon=-71.09296](http://127.0.0.1:5000/stops?lat=42.35947&lon=-71.09296) to see the data returned from the API. If you're adventurous, change the values for `lat` and `lon` in the query string to see new results.
    - The API endpoints have not yet been hosted anywhere. The only way to test them is to run the application locally.
    - The goal is to deploy the API endpoints to Google Cloud.
6. **Test the app pages locally**: Navigate to [the map page](http://127.0.0.1:5000) and [the universities page](http://127.0.0.1:5000/universities)

<!--
### Elasticsearch

*TODO*
-->

### Testing

- We use Python's `unittest` module for unit testing.
- [Python unit testing in VS Code](https://code.visualstudio.com/docs/python/unit-testing):
  - Use `unittest` settings in *.vscode/settings.json*
  - *Command Palette -> Run All Unit Tests*. The result will show up in the status bar.
  - *Command Palette -> View Test Results*.
  - View results in the output panel (Cmd+shift+u).
  - Individual tests can also be run. A popup will show above each test unit in the test module file.
- Unit testing Python from the command line:

  ```sh
  # activate virtual env
  . venv/bin/activate
  # Discover and run tests
  (venv) <path> $ python -W ignore -m unittest discover -vv -s tests -p "*test.py"
  ```

  - This calls python with the following twists:

    1. `-W ignore`: Tells the python interpreter to ignore `warnings` since those are written to the standard error and can act like errors, when they're usually just deprecation warnings.
    2. `-m unittest`: Tells the python interpreter to import the `unittest` module
    3. `discover -vv -s tests -p "*test.py"`: Tells the `unittest` module to discover and run test cases (with a verbosity level of 2) located within the `tests` directory inside python files with the pattern `"*test.py"`

### Continuous Integration

- Tests are run automatically on the GitHub repo by Continuous Integration (CI).
- We use [Travis CI](https://travis-ci.org). Build information is available on the [MBTAccess Travis CI page](https://travis-ci.org/growwithgooglema/mbtaccess).

### Docker

The application is assembled into a [Docker](https://www.docker.com/) container.

- An **image** is the executable set of files used by Docker.
- A **container** is a running image.
- The [Dockerfile](https://docs.docker.com/get-started/part2/#define-a-container-with-dockerfile) tells Docker how to build the container.
- Visual Studio Code has built-in Docker features. See [Working with Docker in VS Code](https://code.visualstudio.com/docs/azure/docker).

To build and run the Docker application container locally:

1. Clone, or fork and clone, the GitHub repository to your machine.
2. [Install Docker Desktop](https://www.docker.com/products/docker-desktop) on your machine.
3. Build and run the container.

    ```sh
    docker build -t mbtaccess .
    docker run -d -p 80:80 mbtaccess:latest
    ```

    `-p 80:80` maps the http port 80 from your local machine to port 80 on the container. Ports other than `80` can be used by modifying the Dockerfile.

    Other useful commands:

    ```sh
    docker container ls
    docker container stop <SHA or container name>
    docker container rm <SHA or container name>
    docker image ls
    docker image rm <SHA or container name>
    ```

4. Browse to [http://localhost:80](http://localhost:80) to see the app.

### Testing

- We use Python's `unittest` module for unit testing.
- [Python unit testing in VS Code](https://code.visualstudio.com/docs/python/unit-testing):
  - Use `unittest` settings in *.vscode/settings.json*
  - *Command Palette -> Run All Unit Tests*. The result will show up in the status bar.
  - *Command Palette -> View Test Results*.
  - View results in the output panel (Cmd+shift+u).
  - Individual tests can also be run. A popup will show above each test unit in the test module file.
- Unit testing Python from the command line:

  ```sh
  # activate virtual env
  . venv/bin/activate
  # Discover and run tests
  (venv) <path> $ python -W ignore -m unittest discover -vv -s tests -p "*test.py"
  ```

  - This calls python with the following twists:

    1. `-W ignore`: Tells the python interpreter to ignore `warnings` since those are written to the standard error and can act like errors, when they're usually just deprecation warnings.
    2. `-m unittest`: Tells the python interpreter to import the `unittest` module
    3. `discover -vv -s tests -p "*test.py"`: Tells the `unittest` module to discover and run test cases (with a verbosity level of 2) located within the `tests` directory inside python files with the pattern `"*test.py"`

### Continuous Integration

- Tests are run automatically on the GitHub repo by Continuous Integration (CI).
- We use [Travis CI](https://travis-ci.org). Build information is available on the [MBTAccess Travis CI page](https://travis-ci.org/growwithgooglema/mbtaccess).

<!--
TODO update the file list after rebuilding the app with Flask

## Repository contents

- [data/](data): JSON data for the list of universities.
- [scripts/](scripts)
  - [get_university_list.py](scripts/get_university_list.py): Python script to fetch the list of universities.
- [static/](static): CSS, image, and JavaScript files for the application.
  - [css/](static/css)
    - [custom.css](static/css/custom.css): Custom CSS for the app, in addition to Bootstrap.
  - [img/](static/img)
  - [js/](static/js)
    - [about](static/js/about.js)
    - [date](static/js/date.js): Footer date calculation
    - [google-maps](static/js/google-maps.js): JavaScript for map page. Sends a location query to the database, and displays results on the page.
    - [sw-install](static/js/sw-install.js): Installation script for the Service Worker script [sw.js](sw.js).
    - [universities](static/js/universities.js): JavaScript for universities page. Shows universities on map, with results in table below.
- [templates/](templates): Webpage HTML. Templates are assembled by Flask.
- [tests/](tests): Application tests.
- [.dockerignore](.dockerignore): Instructions to Docker to exclude certain files from commits.
- [.gitignore](.gitignore): Instructions to Git to exclude certain files from commits.
- [app.py](app.py): Python Flask application module. This is the main file that runs the app, templates the pages, and coordinates the app's functions.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md): Guidelines for conduct.
- [CONTRIBUTING.md](CONTRIBUTING.md): Instructions for contributing to the repository.
- [docker-compose-debug.yml](docker-compose-debug.yml)
- [docker-compose.yml](docker-compose.yml): Docker Compose is a tool that coordinates multiple Docker containers.
- [Dockerfile](Dockerfile): Instructions for Docker container builds.
- [LICENSE](LICENSE): This file describes how the repository can be used by others. We have provided the repository under the MIT license, a permissive and widely-used license. See the [choose a license page](https://choosealicense.com/) for more info on licenses.
- [migrate.py](migrate.py): Python script that fetches data from the MBTA API and stores it in the stops database.
- [models.py](models.py): Python script that sets up the MBTA stops database model.
- [README.md](README.md): This file, a concise description of the repository.
- stops.sqlite: Database of MBTA stops.
- [sw.js](sw.js): This is the Service Worker file. Service Worker is a JavaScript file that sits between the browser and network requests. It helps to coordinate retrieval of information from the network and cache.
- [utilities.py](utilities.py): Python module with helper functions for the application. The functions calculate distances in order to display stop information based on the location searched.

## Maintainers

- [@AbdouSeck](https://github.com/AbdouSeck)
  - **Chief Data Wrangler**
  - **Location Services**
- [@br3ndonland](https://github.com/br3ndonland)
  - **Nominated Benevolent Dictator**
  - **Dr. Documentation**
- [@jethridge13](https://github.com/jethridge13)
  - **Cartesian Contributor**
  - **Interstate Transportation Logistics**
