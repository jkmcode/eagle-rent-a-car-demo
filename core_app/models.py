from enum import unique
from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

class Locations(models.Model):
    name = models.CharField(max_length=255, unique=True)
    short_name = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    creator = models.CharField(max_length=255)
    supp_unique_var = models.IntegerField(unique=True, blank=True, null=True)

    def __str__(self):
        return str(self.short_name)

class Cars(models.Model):
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=100)
    code_registration = models.CharField(max_length=20, unique=True)
    main_location = models.ForeignKey(Locations, related_name='tracks', on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    creator = models.CharField(max_length=255)
    on_the_way = models.BooleanField(default=False)
    location = models.CharField(max_length=255, null=True, blank=True)
    to_the_location = models.CharField(max_length=255, null=True, blank=True)
    come_back = models.BooleanField(default=False)

class Cars_ARC(models.Model):
    id_car = models.CharField(max_length=5)
    id_location = models.CharField(max_length=5)
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=100)
    code_registration = models.CharField(max_length=20)
    creator_ARC = models.CharField(max_length=255)
    change_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=255)
    on_the_way = models.BooleanField(default=False)
    location = models.CharField(max_length=255, null=True, blank=True)
    to_the_location = models.CharField(max_length=255, null=True, blank=True)
    come_back = models.BooleanField(default=False)

class Cars_Reservation(models.Model):
    id_cars = models.ForeignKey(Cars, related_name='carReservations', on_delete=models.SET_NULL, null=True)
    client_name = models.CharField(max_length=255)
    client_document_type = models.CharField(max_length=50, null=True, blank=True)
    client_document_identification = models.CharField(max_length=50, null=True, blank=True)
    client_phone = models.CharField(max_length=20, null=True, blank=True)
    client_email = models.EmailField(null=True, blank=True)
    date_from = models.DateTimeField(null=True, blank=True)
    date_to = models.DateTimeField(null=True, blank=True)
    note = models.CharField(max_length=1024, null=True, blank=True)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    location = models.ForeignKey(Locations, related_name='locationReservations', on_delete=models.SET_NULL, null=True)
    creator = models.CharField(max_length=255)
    date_of_change = models.DateTimeField(blank=True, null=True)
    creator_change = models.CharField(max_length=64,blank=True, null=True)
    type_change = models.CharField(max_length=64,blank=True, null=True)
    id_arc = models.CharField(max_length=64,blank=True, null=True)


class Cars_Rents(models.Model):
    id_cars = models.ForeignKey(Cars, related_name='carRents', on_delete=models.SET_NULL, null=True)
    client_name = models.CharField(max_length=255)
    client_document_type = models.CharField(max_length=50, null=True, blank=True)
    client_document_identification = models.CharField(max_length=50, null=True, blank=True)
    client_phone = models.CharField(max_length=20, null=True, blank=True)
    client_email = models.EmailField(null=True, blank=True)
    date_from = models.DateTimeField(auto_now_add=True)
    date_to = models.DateTimeField(null=True, blank=True)
    deposit = models.CharField(max_length=255)
    deposit_currency = models.CharField(max_length=255)
    deposit_is_active = models.BooleanField(default=False)
    total_price = models.CharField(max_length=255)
    total_price_currency = models.CharField(max_length=255)
    total_price_is_paid = models.BooleanField(default=False)
    creator = models.CharField(max_length=255)
    date_of_entry = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    location = models.ForeignKey(Locations, related_name='locationRents', on_delete=models.SET_NULL, null=True)
    note = models.CharField(max_length=1024, null=True, blank=True)


