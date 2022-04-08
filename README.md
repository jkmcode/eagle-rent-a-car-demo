# Project Title

CAR RENTAL

## Demo link:

Access my site at https://rent-car-demo.herokuapp.com/

## Table of Content:

- About The App
- Screenshots
- Technologies
- Setup
- Approach
- Status
- Credits
- License

## About The App

### General information

CAR RENTAL is an app that allows you to manage information regarding rent the cars.
Thanks to app, you know:

- where you car is,
- who and how long car will be rent,
- the date for which the car has been booked.

Moreover you able to check 'do-to' list which contains all delays of rental, expired reservation and other relevant tasks to accomplish.

### Authentication

- Only Admin can create a user account,
- only Admin can edit password of all employees and his own,
- the user can only change his password,
- only the Admin can give administrative rights to the user,
- only Admin can delete user account,

### Authorisation for user

Each user has access to all locations (rental companies) from which cars are rented. When he enters a given location, he will be able to rent and book cars that are available at the moment. Of course, it is possible to edit a reservation and rental car.

In addition, he will be able to pick up cars from the customer and perform the most important tasks that are assigned to a given rental company.

Potentail tasks which list 'to-do' contains:

- confirmation of today's booking,
- confirmation of today's rental,
- expired reservation,
- delayed rental,

User can use fast searching of reservations which means that user will have all available cars from all localisations.
It is possible to find reservation based on client name, code registration and name of car.

### Authorisation for Admin

The administrator has all functions just like a normal user.

Beside this Admin can:

- create and edit cars,
- create and edit location,
- create, edit and delete user.

## Business logic

After logging in, the user is redirected to choose the location where he will perform activities related to renting, booking and picking up the car.

When the user selects the location where he wants to work, he will be in the employee panel, containing 5 sections:

- Rent (all cars available for rent today appear),
- In Use (rental cars to be picked up at this Location),
- To do list (activities that the user will have to perform today, eg picking up the car, confirming the reservation by the client, contacting the client if the car is not delivered on time or editing reservations and rentals). It should be noted that activities not performed in the previous days will be included in this section, e.g. delayed rental.
- New reservation (list of all cars assigned to the Location),
- Edit reservation (list of reservations assigned to a Location).

The user can change the location by clicking on the logo (then he will be redirected to the location selection) or select the location via the navigation bar.

Background colors in the "In Use" section:

- When the car is rented the background color is yellow (# ffd699)
- When the rental is delayed the background color is light red (#fd8b8b)

Background colors in the "To do list" section:

- On the day of picking up the car, the background color is yellow (# ffd699)
- In the case of a delayed rental, the background color is light red (# fd8b8b)
- In the case of booking, the background color is light blue (# e6f2ff)
- For delayed booking, the background color is red (# cc0000)

Car booking regardless of location:
The user can check the availability of a given car in a given period of time, regardless of the car's location. The navigation bar has a section "Reservation  New". After entering the dates given by the user, we will get a list of cars available for a given period of time.

Search engine for reservations:
To use the search engine, use the "Booking  Search" section on the navigation bar. Thanks to this functionality, the user is able to filter all reservations in the system. Filtering works by searching for the customer's first and last name, registration number of car or car name.

Changing localisation related to moving cars:
At the beginning Administrator must add initial localisation. Based on that activities related to the newly given car will only be possible in the assigned initial location.

When the car is moved to a different place than originally, the tasks associated with it will be redirected to a given location. In terms of booking a car, the tasks for it will remain in the original location because the car is not moving.

Example 1

- The car has been rented from Location 1 and the customer will want to return it to Location 2 (activities related to picking up the car, editing the rental and potential delays will be visible in the tasks for Location 2). From the first day of the rental, the car will be visible in the "In use" section. On the last day, there will be one more activity in "To do list" related to picking up the car from the customer.
- When customer wants to change the place of returning the car from Location 2 back to Location 1, the activities related to the car will move to Location 1.

Example 2

- The client books a car from Location 3 for a specified period of time. he wants to pick it up at Location 4.
- In this case, car activities will stay in Location 3 because car is not moving. Only on the day of booking, the activity related to the rental of the previously booked car will appear in Location 4.
- In "To do list", the booked car will be visible for rent. If the client does not report, the reservation will be automatically removed from "To do list" after 12 hours. The user can manually delete or edit such a reservation. When he changes the location (eg Location 2) in which the user will pick up the car, the activities related to the booking will appear in Location 2 on the day of picking up the car.

When the car is picked up at a given Location, it will be visible in that Location and you will be able to perform activities related to it (e.g. make a reservation or rent it).

The car is not suitable for rental:
If the car is out of order or there are other circumstances that make it impossible to rent, the user can set it as inactive. This is only possible if you have administrative privileges.

Renting and booking a car depending on the time and date:
A car rental is possible only if the given car is available at the rental location (location). This means that it is not possible to rent a car when it is not available. If the car is in a different rental location (location), it will be available within 4 hours. If the car is available in the same location, it will be possible to rent the car 1 hour after picking up the car.

Changing the size of the time frame necessary to prepare the car to use is flexible.

Example 1

- The client wants to rent a car at Location 1. The car was picked up at Location 2 at 12:00. This means the car will be available for rental at Location 1 at 4:00 PM.

Example 2

- The client wants to rent a car at Location 1. The car was picked up at Location 1 at 12:00. This means that the car will be available for rental at 1pm.

The minimum rental time is 1 hour.

Booking a car is possible only if the car is not rented at that time and it does not overlap with another booking. Depending on the location where the car is to be picked up by the customer, a technical break of 4 hours has been established when the car pickup location is different from the car rental location booked by the next customer. The technical break lasts 1 hour when the pickup and rental of the car occur at the same time.

Example 1

- The customer books the car at Location 1. The car will be picked up at Location 2 at 12:00. In this case, the car can be booked on the same day at 4:00 p.m.

Example 2

- The customer books the car at Location 1. The car will be picked up at the same Location at 12:00. In this case, the car can be booked on the same day at 1:00 p.m.

Calendar

Each car has a calendar. Thanks to this, the user can see when and how long a car is booked or rented. The calendar presents data in two ways. The dates are shown in the calendar and in the form of an agenda. Bar contains basic information such as: name and surname of the client, the location where the car will be picked up from the customer or the place where the customer wants to rent the car (in the case of reservation). The blue color reflects the rental and the orange color the reservation.

https://miro.com/app/board/uXjVOF-piFg=/?moveToWidget=3458764521803910917&cot=14

## Technologies

- HTML 5
- CSS
- React bootstrap
- Axios
- JavaScripts (React JS)
- Python (Django, RestApi)

## Download & Setup Instructions

- 1 - Clone project: git clone https://github.com/jkmcode/eagle-rent-a-car-demo
- 2 - cd eagle-rent-a-car-demo
- 3 - Create virtual environment: virtualenv myenv
- 4 - cd myenv\scripts
- 5 - activate virtual environment: activate
- 6 - back to project: eagle-rent-a-car-demo
- 7 - pip install -r requirements.txt
- 8 - python manage.py runserver

### Frontend

Use the nmp package manager to install:

- @fortawesome/fontawesome-svg-core@1.3.0
- @fortawesome/free-solid-svg-icons@6.0.0
- @fortawesome/react-fontawesome@0.1.17
- @syncfusion/ej2-react-calendars@19.4.42
- @testing-library/jest-dom@5.16.1
- @testing-library/react@12.1.2
- @testing-library/user-event@13.5.0
- axios@0.24.0
- bootstrap@5.1.3
- date-fns@2.28.0
- favicons-webpack-plugin@5.0.2
- favicons@7.0.0-beta.3
- html-webpack-plugin@5.5.0
- i@0.3.7
- npm@8.5.4
- react-big-calendar@0.38.5
- react-bootstrap@2.1.0
- react-datepicker@4.6.0
- react-dom@17.0.2
- react-hook-form@7.22.5
- react-redux@7.2.6
- react-router-bootstrap@0.26.0
- react-router-dom@6.2.1
- react-scripts@5.0.0
- react-scroll@1.8.4
- react@17.0.2
- redux-devtools-extension@2.13.9
- redux-thunk@2.4.1
- redux@4.1.2
- web-vitals@2.1.2
- webpack-pwa-manifest@4.3.

### Backend

Use the pip package manager to install:

- arrow 1.2.2
- asgiref 3.4.1
- binaryornot 0.4.4
- boto3 1.21.12
- botocore 1.24.12
- certifi 2021.10.8
- chardet 4.0.0
- charset-normalizer 2.0.12
- click 8.0.4
- colorama 0.4.4
- cookiecutter 1.7.3
- Django 4.0.1
- django-cors-headers 3.10.1
- django-pwa 1.0.10
- django-simple-pwa 2.2.1
- django-storages 1.12.3
- djangorestframework 3.13.1
- djangorestframework-simplejwt 5.0.0
- gunicorn 20.1.0
- idna 3.3
- install 1.3.5
- Jinja2 3.0.3
- jinja2-time 0.2.0
- jmespath 0.10.0
- MarkupSafe 2.1.1
- Pillow 9.0.0
- pip 21.0.1
- poyo 0.5.0
- psycopg2 2.9.3
- PyJWT 2.3.0
- python-dateutil 2.8.2
- python-dotenv 0.19.2
- python-slugify 6.1.1
- python-webpack-boilerplate 0.0.10
- pytz 2021.3
- requests 2.27.1
- s3transfer 0.5.2
- setuptools 54.1.2
- six 1.16.0
- sqlparse 0.4.2
- text-unidecode 1.3
- tzdata 2021.5
- urllib3 1.26.8
- wheel 0.36.2
- whitenoise 6.0.0
