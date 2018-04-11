# README

<a href="https://www.udacity.com/">
  <img src="https://s3-us-west-1.amazonaws.com/udacity-content/rebrand/svg/logo.min.svg" width="300">
</a>

[Udacity Grow with Google](https://www.udacity.com/grow-with-google) Scholarship challenge course

[2018](https://sites.google.com/udacity.com/gwgdevscholarship/home) cohort

Intermediate Web Developer track

Collaborative project

## Description

This project will create a web application with Google Maps and MBTA APIs.

We are developing on the `dev` branch.

## Instructions

Please review the instructions in the [CONTRIBUTING.md](https://github.com/growwithgooglema/projects/blob/master/CONTRIBUTING.md) file for our organization.

## Contributors

- @AbdouSeck
  - **Chief Data Wrangler**
  - **Friendly DevOps**
  - **Location Services**
- @br3ndonland
  - **Nominated Benevolent Dictator**
  - **Dr. Documentation**
  - **Master of Markdown**
- @jethridge13
  - **Cartesian Contributor**
  - **Interstate Transportation Logistics**
- @noirfatale
  - **Front End programming**
  - **Design Maven**
  - **Div dabbling**
  - **People Ops**
- @sereneliu
  - **Front-End Ninja**

## Running the application

The main application resides inside the `index.html` file. To run it, you will need to start an HTTP server. `Python` offers a quick and dirty way to do this. Depending on whether you're on `python 2+` or `python 3+`, you should be able get an HTTP server started with the following:

*Note*: Please make sure you switch to the directory where the `index.html` file is.

In `python 2+`:
```bash
git clone git@github.com:growwithgooglema/gwg-mbta.git
cd gwg-mbta
python -m SimpleHTTPServer 8000
```

In `python 3+`
```bash
git clone git@github.com:growwithgooglema/gwg-mbta.git
cd gwg-mbta
python3 -m http.server 8000 -b localhost
```

If either of these two worked, head to http://127.0.0.1:8000 from your browser. The application is being served there.

*Note*: If you get any error related to a `PORT` issue, then it must be that you've got something running at port 8000; in which case, you should change 8000 to some other port that is not currently being used.
