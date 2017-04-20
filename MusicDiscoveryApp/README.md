# Music Discovery App

This is a music discovery app which utilizes the Spotify API to edit a user's playlist. It is integrated with Spotify Login,  
and has a unique discovery system which pulls in the top tracks from all the artists in your saved music, and displays them. It also   includes a way to preview the music before deciding to add them to a specific playlist.   

## Home Page 

This is the main page of the app, which displays all the user's playlists. Just click a playlist to view its contents.  


![Alt text](https://github.com/btholmes/PythonDevelpment/blob/master/MusicDiscoveryApp/ReadMeImages/Screen%20Shot%202017-04-20%20at%208.36.32%20AM.png?raw=true "Home Page")


## Playlists Page 

This is the page which displays upon clicking a specific playlist. It includes all the music contained in the playlist, and provides   
a way to delete specific songs.   


![Alt text](https://github.com/btholmes/PythonDevelpment/blob/master/MusicDiscoveryApp/ReadMeImages/Screen%20Shot%202017-04-20%20at%208.36.50%20AM.png?raw=true "Playlists Top")

![Alt text](https://github.com/btholmes/PythonDevelpment/blob/master/MusicDiscoveryApp/ReadMeImages/Screen%20Shot%202017-04-20%20at%208.36.59%20AM.png?raw=true "Playlists Scrolled")


## Discover Page

The discover page allows a user to search by all artists in their saved music, and discover their most recent releases. Then  
they can preview the song, and add them to a specific playlist in their library.  


![Alt text](https://github.com/btholmes/PythonDevelpment/blob/master/MusicDiscoveryApp/ReadMeImages/Screen%20Shot%202017-04-20%20at%208.37.44%20AM.png?raw=true "Discover New Music")


This project is application skeleton for typical Flask and AngularJS web apps. You can use it to quickly bootstrap your Flask and Angular web app projects and dev environment.

The project setup contains two things:

1. A sample Flask application configured to serve dynamic pages as well as provide an example API
2. A sample AngularJS application based off [angular-seed](https://github.com/angular/angular-seed) used to interact with the API created using Flask

Both the python, and node servers must be running for the app to function.  

### Design

* Fully implemented Bootstrap theme: Readable from [Bootswatch](http://bootswatch.com/readable/)
* Over 250 glyphs in font format from the Glyphicon Halflings set.
* Done-for-you drop-down menus just waiting for you to expand the app and add your own urls.
* Custom favicon made from the Flask logo. Just replace it with yours.

### Javascript

* [jQuery](https://jquery.com/) 2.2.3
* [D3.js](https://d3js.org/) 3.5.16
* [Moment.js](http://momentjs.com/) 2.12.0 - for parsing, validating, manipulating, and displaying dates in JavaScript.
* [BootStrap DateTimePicker](https://github.com/Eonasdan/bootstrap-datetimepicker) 4.17.37 - make your datetime picker look super hot.

### Python

* [Flask](http://flask.pocoo.org/)
* [Flask-RESTful](http://flask-restful-cn.readthedocs.org/en/0.3.4/)
* [Scutils](https://github.com/istresearch/scrapy-cluster/tree/master/utils)
* [Markdown](https://pypi.python.org/pypi/Markdown)

## What's In The Box - AngularJS

The AngularJS application is preconfigured to install the Angular framework and a host of development and testing tools. The app does one thing - demonstrates how to interact with a RESTful API.

## Requirements

* Python 2.7+

If you want to run the AngularJS application, you will also need:

* [Node.js](https://nodejs.org/)
* Node Package Manager (npm)
* [Bower](http://bower.io/#install-bower)

## Getting Started

Clone the repo

    git clone https://github.com/btholmes/PythonDevelpment

Navigate to the main directory

    cd base-flask-app/api

Install the requirements

    pip install -r requirements.txt


### Run the Flask App

If you would like run the Flask application, do this:

Change into the api directory:

    cd api

Run the Flask app:

    python index.py


### Run the AngularJS App

If you would like run the included AngularJS application, perform the steps in the previous section to start the Flask app and then do the following:

Open a second terminal window and navigate to the angular-for-flask directory (in the base-flask-app folder):

    cd base-flask-app/angular-for-flask

Install the required dependencies:

    npm install

Use Bower to install bootstrap (may require sudo):

    bower install bootstrap

Run the application:

    npm start

Browse to the default page: [http://localhost:8000/app](http://localhost:8000/app)

