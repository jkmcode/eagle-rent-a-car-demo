from django.urls import include, re_path, path
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from core_app import views
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("", include("pwa.urls")),
    # users
    path("api/users/", views.getUsers, name="userslist"),
    path(
        "api/users/login/", views.MyTokenObtainPairView.as_view(), name="token_refresh"
    ),
    path("api/users/profile/", views.getUserProfile, name="user_profile"),
    path(
        "api/users/profile/update", views.updateUserProfile, name="user-profile-update"
    ),
    path("api/users/createuser/", views.createUser, name="user-profile-update"),
    path("api/users/delete/<str:pk>/", views.deleteUser, name="user-delete"),
    path("api/users/<str:pk>/", views.getUsersById, name="user-edit"),
    path("api/users/update/<str:pk>/", views.updateUser, name="user-update"),
    path("admin/", admin.site.urls),
    # locations
    path("api/locations/upload/", views.uploadImage, name="upload-image"),
    path("api/locations/", views.getLocations, name="locations-list"),
    path("api/locations/create/", views.createLocation, name="locations-create"),
    path("api/location/<str:pk>/", views.getLocationById, name="get-location-by-id"),
    path("api/location/update/<str:pk>/", views.updateLocation, name="location-update"),
    path(
        "api/new/location/upload/", views.newLocationUploadImage, name="location-update"
    ),
    # cars
    path("api/cars/image/upload/", views.carUploadImage, name="car-upload-image"),
    path("api/new/cars/upload/", views.newCarUploadImage, name="new-car-upload-image"),
    path("api/cars/", views.getCars, name="cars-list"),
    path("api/car/create/", views.createCar, name="create-car"),
    path("api/car/<str:pk>/", views.getCarById, name="get-car-by-id"),
    path("api/car/update/<str:pk>/", views.updateCar, name="car-update"),
    # carListByLocation
    path(
        "mainpage/<str:pk>/car-list/to-rent/",
        views.getCarListByLocationToRent,
        name="get-carlist-by-location-to-rent",
    ),
    path(
        "mainpage/<str:pk>/car-list/in-use/",
        views.getCarListByLocationInUse,
        name="get-carlist-by-location-in-use",
    ),
    path(
        "mainpage/<str:pk>/car-list/to-do/",
        views.getCarListByLocationToDo,
        name="get-carlist-by-location-to-do",
    ),
    path(
        "mainpage/<str:pk>/car-list/reservations/",
        views.getCarListByLocationReservations,
        name="get-carlist-by-location-reservations",
    ),
    path(
        "mainpage/<str:pk>/car-list/new-reservation/",
        views.getCarListByLocationNewReservations,
        name="get-carlist-by-location-new-reservation",
    ),
    # carListByLocation - filters
    path(
        "mainpage/<str:pk>/car-list/fiter-reservations/",
        views.getCarListFilterReservation,
        name="get-carlist-by-location-fiter-reservations",
    ),
    path(
        "mainpage/<str:pk>/car-list/fiter-rents/",
        views.getCarListFilterRents,
        name="get-carlist-by-location-fiter-rents",
    ),
    path(
        "mainpage/<str:pk>/car-list/fiter-all/",
        views.getCarListByLocationToDo,
        name="get-carlist-by-location-fiter-all",
    ),
    path(
        "list-of-reservations/cars/",
        views.getReservationList,
        name="get-reservation-list-fiter-all",
    ),
    # carReservation
    path(
        "api/filter/reservation/", views.filterReservations, name="filter-reservations"
    ),
    path(
        "api/reservation/car/create/",
        views.createReservationCar,
        name="create-reservation-car",
    ),
    path(
        "api/reservation/list/car/<str:pk>/<str:loc>/",
        views.listReservationCar,
        name="list-reservation-car",
    ),
    path(
        "api/reservation/delete/<str:pk>/",
        views.deleteReservation,
        name="reservation-delete",
    ),
    path(
        "api/car/single/reservation/<str:pk>/edit/",
        views.getReservationById,
        name="get-reservation-by-id",
    ),
    path(
        "api/reservation/update/<str:pk>/",
        views.updateReservation,
        name="update-reservation",
    ),
    # carRent
    path("api/rent/car/create/", views.createRentCar, name="create-rent-car"),
    path("api/rents/list/car/<str:pk>/", views.listRentsCar, name="list-rents-car"),
    path("api/rent/edit/<str:pk>/", views.editCarRent, name="edit-rent"),
    # car pick-up
    path(
        "api/<str:pk>/rent-details/",
        views.getRentDetailsByCarId,
        name="get-rent-details-by-car-id",
    ),
    path("api/rent/update/<str:pk>/", views.carUpdateRent, name="car-update-rent"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
