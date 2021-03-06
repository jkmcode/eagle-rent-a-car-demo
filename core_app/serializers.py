from asyncore import read
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    IsAdmin = serializers.SerializerMethodField(read_only=True)
    IsSuperUser = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "_id", "username", "email", "name", "IsAdmin", "IsSuperUser"]

    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_IsAdmin(self, obj):
        return obj.is_staff

    def get_IsSuperUser(self, obj):
        return obj.is_superuser


class UserSeralizerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "_id",
            "username",
            "email",
            "name",
            "IsAdmin",
            "IsSuperUser",
            "token",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# LOCATIONS


class LocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locations
        fields = "__all__"


# CARS


class CarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cars
        fields = "__all__"


class CarsSerializerReservation(serializers.ModelSerializer):
    type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Cars
        fields = ["id", "name", "short_name", "code_registration", "image", "type"]

    def get_type(self, obj):
        return "Rezerwacja"


class CarsSerializerRents(serializers.ModelSerializer):
    type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Cars
        fields = ["id", "name", "short_name", "code_registration", "image", "type"]

    def get_type(self, obj):
        return "Najem"


class CarsSerializerWithMainLocation(serializers.ModelSerializer):

    main_location = LocationsSerializer(many=False)

    class Meta:
        model = Cars
        fields = [
            "id",
            "name",
            "short_name",
            "code_registration",
            "location",
            "image",
            "is_active",
            "to_the_location",
            "main_location",
        ]


class CarsReservationSerializer(serializers.ModelSerializer):
    start_year = serializers.SerializerMethodField(read_only=True)
    start_month = serializers.SerializerMethodField(read_only=True)
    start_day = serializers.SerializerMethodField(read_only=True)
    start_hour = serializers.SerializerMethodField(read_only=True)
    start_minute = serializers.SerializerMethodField(read_only=True)

    end_year = serializers.SerializerMethodField(read_only=True)
    end_month = serializers.SerializerMethodField(read_only=True)
    end_day = serializers.SerializerMethodField(read_only=True)
    end_hour = serializers.SerializerMethodField(read_only=True)
    end_minute = serializers.SerializerMethodField(read_only=True)

    type = serializers.SerializerMethodField(read_only=True)

    id_cars = CarsSerializer(many=False)
    location = LocationsSerializer(many=False)

    class Meta:
        model = Cars_Reservation
        fields = [
            "id",
            "id_cars",
            "client_name",
            "client_document_type",
            "client_document_identification",
            "client_phone",
            "client_email",
            "date_from",
            "start_year",
            "start_month",
            "start_day",
            "start_hour",
            "start_minute",
            "date_to",
            "end_year",
            "end_month",
            "end_day",
            "end_hour",
            "end_minute",
            "note",
            "type",
            "location",
        ]

    def get_start_year(self, obj):
        start_year = obj.date_from.year
        return start_year

    def get_start_month(self, obj):
        start_month = obj.date_from.month
        return start_month

    def get_start_day(self, obj):
        start_day = obj.date_from.day
        return start_day

    def get_start_hour(self, obj):
        start_hour = obj.date_from.hour
        return start_hour

    def get_start_minute(self, obj):
        start_minute = obj.date_from.minute
        return start_minute

    def get_end_year(self, obj):
        end_year = obj.date_to.year
        return end_year

    def get_end_month(self, obj):
        end_month = obj.date_to.month
        return end_month

    def get_end_day(self, obj):
        end_day = obj.date_to.day
        return end_day

    def get_end_hour(self, obj):
        end_hour = obj.date_to.hour
        return end_hour

    def get_end_minute(self, obj):
        end_minute = obj.date_to.minute
        return end_minute

    def get_type(self, obj):
        if obj.date_from < timezone.now():
            return "Reservation delayed"
        else:
            return "Reservation"


class CarsRentsSerializer(serializers.ModelSerializer):
    start_year = serializers.SerializerMethodField(read_only=True)
    start_month = serializers.SerializerMethodField(read_only=True)
    start_day = serializers.SerializerMethodField(read_only=True)
    start_hour = serializers.SerializerMethodField(read_only=True)
    start_minute = serializers.SerializerMethodField(read_only=True)

    end_year = serializers.SerializerMethodField(read_only=True)
    end_month = serializers.SerializerMethodField(read_only=True)
    end_day = serializers.SerializerMethodField(read_only=True)
    end_hour = serializers.SerializerMethodField(read_only=True)
    end_minute = serializers.SerializerMethodField(read_only=True)

    type = serializers.SerializerMethodField(read_only=True)

    id_cars = CarsSerializer(many=False)
    location = LocationsSerializer(many=False)

    class Meta:
        model = Cars_Rents
        fields = [
            "id",
            "id_cars",
            "client_name",
            "client_document_type",
            "client_document_identification",
            "client_phone",
            "client_email",
            "deposit",
            "deposit_currency",
            "deposit_is_active",
            "total_price",
            "total_price_currency",
            "total_price_is_paid",
            "location",
            "note",
            "date_from",
            "start_year",
            "start_month",
            "start_day",
            "start_hour",
            "start_minute",
            "date_to",
            "end_year",
            "end_month",
            "end_day",
            "end_hour",
            "end_minute",
            "type",
        ]

    def get_start_year(self, obj):
        start_year = obj.date_from.year
        return start_year

    def get_start_month(self, obj):
        start_month = obj.date_from.month
        return start_month

    def get_start_day(self, obj):
        start_day = obj.date_from.day
        return start_day

    def get_start_hour(self, obj):
        start_hour = obj.date_from.hour
        return start_hour

    def get_start_minute(self, obj):
        start_minute = obj.date_from.minute
        return start_minute

    def get_end_year(self, obj):
        end_year = obj.date_to.year
        return end_year

    def get_end_month(self, obj):
        end_month = obj.date_to.month
        return end_month

    def get_end_day(self, obj):
        end_day = obj.date_to.day
        return end_day

    def get_end_hour(self, obj):
        end_hour = obj.date_to.hour
        return end_hour

    def get_end_minute(self, obj):
        end_minute = obj.date_to.minute
        return end_minute

    def get_type(self, obj):
        if obj.date_to < timezone.now():
            return "Delayed rental"
        else:
            return "Rental"
