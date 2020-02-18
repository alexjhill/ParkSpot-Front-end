# ParkSpot-Front-end

Parkspot is a multi-year design and development challenge for students in new-media development and related fields. The ultimate goal is to develop a solution for finding available parking spots in the city through the use of the Internet of Things. Each iteration, a team of students from each of the participating cities develops this idea further.

For the iteration I participated in, we used remote Raspberry PI devices, running computer vision software, to check for the availability of parking spaces. This data was then be sent to a web server via the [LoRa network](https://lora-alliance.org/) and the [Things Network](https://www.thethingsnetwork.org/), before being displayed to users in a web interface. I worked on the web server which was developed with Python-Flask and Nginx and the front-end interface which used Google Maps APIs. I learned a lot about working with APIs and understanding and managing the architecture of a large, collaborative, scalable project.

Instructions for the running the application can be found below, however, the Google Maps API key has expired and currently the application uses dummy-data as the rest of the system has been taken offline after the completion of the project.

![Parkspot interface](parkspot.gif)

* Python
* Flask
* Google Maps API
* HTML5
* CSS3
* JavaScript

### To run the Python-Flask app:
1. install Flask with pip
```
$ pip install flask
```
2. open command line at the "app" directory
3. run the app in dev mode:
```
$ export FLASK_ENV=development  
$ flask run  
```
4. app should be running at localhost:5000
