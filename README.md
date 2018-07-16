# README

[Grow with Google - New England](https://github.com/growwithgooglema) collaborative project

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Instructions](#instructions)
- [Stack](#stack)
- [Repository contents](#repository-contents)
- [Running the application](#running-the-application)
  - [Docker](#docker)
  - [Local HTTP server](#local-http-server)
- [Contributors](#contributors)

## Description

This app integrates the Google Maps and MBTA (Massachusetts Bay Transportation Authority) APIs to provide wheelchair accessibility data for MBTA stops.

MBTA recently released their [MBTA V3 API](https://api-v3.mbta.com/) that provides public transportation data in JSON API format. One of the under-utilized datasets in their API is the wheelchair accessibility of the stops. Google Maps [recently started](http://fortune.com/2018/03/15/google-maps-wheelchair-accessible-routes/) providing wheelchair accessibility info, but the implementation is not particularly extensive.

**We aim to create a web app that quickly and conveniently identifies wheelchair accessible stops near the user.**

## Instructions

- Please review the instructions in [CONTRIBUTING.md](CONTRIBUTING.md).
- Please behave according to the [Code of Conduct](CODE_OF_CONDUCT.md).
- We are developing on the `dev` branch.

## Stack

<!-- TODO: We should provide a clear description of how the app works. -->

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

## Running the application

### Docker

The application is available as a container image on the Docker Hub. With each commit to the Master branch in the GitHub repository, a new container image is created. 

Pull the image with
```bash
docker pull growwithgooglema/gwg-mbta:latest
```

To run the container locally, run:
```bash
docker run -d -p 80:8000 growwithgooglema/gwg-mbta:latest
```

Where `-p 80:8000` specifies the port-mapping and maps the default http port 80 from your local machine to port 8000 on the container. Alternatively, you can map a different local port than 80 to the container, but you have to specify port 8000 as the container port unless you modify the Dockerfile and change the http server listener port.

To check if the application is running correctly, open a web browser and go to `http://localhost:80`.


### Local HTTP server

The main application resides inside the `index.html` file. To run it, you will need to start an HTTP server. `Python` offers a quick and dirty way to do this. Depending on whether you're on `python 2+` or `python 3+`, you should be able get an HTTP server started with the following:

*Note*: Please make sure you switch to the directory where the `index.html` file is.

In `python 2+`:

```bash
git clone git@github.com:growwithgooglema/mbtaccess.git
cd mbtaccess
python -m SimpleHTTPServer 8000
```

In `python 3+`

```bash
git clone git@github.com:growwithgooglema/mbtaccess.git
cd mbtaccess
python3 -m http.server 8000 -b localhost
```

If either of these two worked, head to [http://127.0.0.1:8000](http://127.0.0.1:8000) from your browser. The application is being served there.

*Note*: If you get any error related to a `PORT` issue, then it must be that you've got something running at port 8000; in which case, you should change 8000 to some other port that is not currently being used.


### [Using Flask](http://flask.pocoo.org/)
To speed up the application, we're contemplating using Flask to generate API endpoints such `stops?lat=value&lon=value`.

To interact with the application using Flask, the following steps need to be taken:
1. [Create a python virtual environment](https://packaging.python.org/guides/installing-using-pip-and-virtualenv/)
2. Activate the virtual environment
3. Install the packages inside `requirements.txt` with `pip install -r requirements.txt`
4. Run `python migrate.py` (this needs to be run only once to populate the `mbta_stops` table in a DB called `test_database.sqlite`)
5. Run `python app.py`
6. Go to `http://127.0.0.1:5000/stops?lat=42.35947&lon=-71.09296` to see the returned data from the API
7. If you're adventurous, change the values for `lat` and `lon` in the query string to see new results
8. Test the [`index.html`](http://127.0.0.1:5000/index.html) and [`universities.html`](http://127.0.0.1:5000/universities.html)

### Notes about flask:
1. flask, by default, will bind the application on port 5000. If you wish to change this, you can export an `APP_PORT` environment variable and call the script:
```
export APP_PORT=7000 && python app.py
```
2. Since the API endpoints have not yet been hosted anywhere, the only way to test them is to run the application locally. The goal is to deploy the API endpoints on Google Cloud.

## Contributors

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
- [@noirfatale](https://github.com/noirfatale)
  - **Front-End programming**
  - **Design Maven**
  - **People Ops**
- [@sereneliu](https://github.com/sereneliu)
  - **Front-End Ninja**
