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
- Edycja rezerwacji (lista rezerwacji przypisanych do Lokalizacji).

The user can change the location by clicking on the logo (then he will be redirected to the location selection) or select the location via the navigation bar.

https://miro.com/app/board/uXjVOF-piFg=/?moveToWidget=3458764521803910917&cot=14

## Technologies

- HTML 5
- CSS
- React bootstrap
- Axios
- JavaScripts (React JS)
- Python (Django, RestApi)

## Installation

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
