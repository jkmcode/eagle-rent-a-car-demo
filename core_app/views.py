from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
# from .serializers import UserSerializer, UserSeralizerWithToken, LocationsSerializer, CarsSerializer, CarsSerializerWithMainLocation, CarsReservationSerializer
from .serializers import *
from django.contrib.auth.models import User
from .models import *
from datetime import datetime
from datetime import timedelta
from django.utils import timezone
import pytz
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSeralizerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSeralizerWithToken(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):  
    user = request.user
    serializer = UserSeralizerWithToken(user, many=False)
    data = request.data

    try:
        user.password = make_password(data['password'])
        user.save()
        return Response(serializer.data)

    except:
        message = {'detail': 'Błąd serwera'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['name'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSeralizerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Podany email lub nazwa użytkownika już istnieje'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsersById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):  
    user = User.objects.get(id=pk)
    data = request.data
    user.first_name = data['name']
    user.username = data['name']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    if data['changingPassword'] == True:
        user.password=make_password(data['password'])
 
    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)



#LOCATIONS

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getLocations(request):
    locations = Locations.objects.filter(is_active=True)
    serializer = LocationsSerializer(locations, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createLocation(request):
    data = request.data
    try:
        location = Locations.objects.create(
            name=data['name'],
            short_name=data['shortName'],
            creator= data['creator'],
            supp_unique_var= data['supp_unique_var']
        )

        serializer = LocationsSerializer(location, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Podana nazwa już istnieje'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getLocationById(request, pk):
    user = Locations.objects.get(id=pk)
    serializer = LocationsSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateLocation(request, pk):   
    location = Locations.objects.get(id=pk)
    
    data = request.data
    location.name = data['name']
    location.short_name = data['shortName']
    location.is_active = data['isActive']
 
    location.save()

    serializer = LocationsSerializer(location, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    location_id = data['location_id']
    location = Locations.objects.get(id=location_id)
    location.image = request.FILES.get('image')  

    location.save()
    
    serializer = LocationsSerializer(location, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def locationUploadImage(request):
    print('wchodzę do funkcji locationUploadImage')
    # data = request.data
    # location_id = data['location_id']
    # location = Locations.objects.get(id=location_id)
    # location.image = request.FILES.get('image')  

    # location.save()
    
    # serializer = LocationsSerializer(location, many=False)
    return Response('działa dobrze')


@api_view(['POST'])
def newLocationUploadImage(request):
    data = request.data
    supp_unique = data['suppUniqueVar']

    locationWithImage = Locations.objects.get(supp_unique_var=supp_unique)
    locationWithImage.image = request.FILES.get('image')  
    locationWithImage.save()
    
    serializer = LocationsSerializer(locationWithImage, many=False)
    return Response(serializer.data)

#CARS

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCars(request):
    cars = Cars.objects.all()
    serializer = CarsSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCar(request):
    data = request.data

    obj_location = Locations.objects.get(id=data['location'])

    try:
        car = Cars.objects.create(
            name= data['name'],
            short_name= data['shortName'],
            code_registration = data['codeRegistration'],
            main_location = obj_location,
            creator = data['creator'],
            location = data['location'],
            to_the_location = data['location'],
            # image = request.FILES.get('image')
        )

        serializer = CarsSerializer(car, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'Podany kod rejestracyjny już istnieje'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def carUploadImage(request):
    data = request.data
    car_id = data['car_id']
    car = Cars.objects.get(id=car_id)
    
    car.image = request.FILES.get('image')  
    car.save()
    
    serializer = CarsSerializer(car, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def newCarUploadImage(request):
    data = request.data
    codeRegistration = data['codeRegistration']
    car = Cars.objects.get(code_registration=codeRegistration)
    
    car.image = request.FILES.get('image')  

    car.save()
    
    serializer = CarsSerializer(car, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarById(request, pk):
    car = Cars.objects.get(id=pk)
    serializer = CarsSerializerWithMainLocation(car, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCar(request, pk):   
    data = request.data
    obj_location = Locations.objects.get(id=data['selectLocation'])
    car = Cars.objects.get(id=pk)

    
    car_ARC = Cars_ARC.objects.create(
        id_car = car.id,
        id_location = car.main_location.id,
        name= car.name,
        short_name= car.short_name,
        code_registration = car.code_registration,
        creator_ARC = data['creator'], 
        type = data['type'],
        on_the_way = car.on_the_way,
        location = car.location,
        to_the_location = car.to_the_location,
        come_back = car.come_back
    )

    try:
        car.name = data['name']
        car.short_name = data['shortName']
        car.main_location = obj_location
        car.code_registration = data['codeRegistration']
        car.is_active = data['isActive']
    
        car.save()

        serializer = CarsSerializer(car, many=False)

        return Response(serializer.data)

    except:
        message = {'detail': 'Podany kod rejestracyjny już istnieje'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#CARLIST BY LOCATION

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListByLocationToRent(request, pk):
    carList = Cars.objects.filter(location=pk, is_active=True, on_the_way=False)

    # page = request.query_params.get('page')
    # paginator = Paginator(carList, 4)

    # try:
    #     carList = paginator.page(page)
    # except PageNotAnInteger:
    #     carList = paginator.page(1)
    # except EmptyPage:
    #     carList = paginator.page(paginator.num_pages)

    # if page == None:
    #     page = 1

    # page = int(page)

    serializer = CarsSerializer(carList, many=True)

    return Response(serializer.data)
    #return Response({'carList':serializer.data, 'page':page, 'pages': paginator.num_pages})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListByLocationInUse(request, pk):
    carRent = Cars_Rents.objects.filter(
        location=pk,
        is_active = True
    ).order_by('date_to')

    carSerializerRents = CarsRentsSerializer(carRent, many=True)

    return Response(carSerializerRents.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListByLocationToDo(request, pk):

    today_plus = timezone.now() + timedelta(hours=12)
    today_minus = timezone.now() - timedelta(hours=12)

    carResArchive = Cars_Reservation.objects.filter(
        date_from__lt = today_minus,
        is_active = True        
    )

    for i in carResArchive:
        i.is_active = False
        i.type_change = 'delete automatically'
        i.date_of_change = timezone.now()
        i.save()

    carRes = Cars_Reservation.objects.filter(
        location=pk,
        date_from__lt = today_plus,
        date_from__gt = today_minus,
        is_active = True
    ).order_by('date_from')

    carRent = Cars_Rents.objects.filter(
        location=pk,
        date_to__lt = today_plus,
        is_active = True
    ).order_by('date_to')

    carSerializerReservation = CarsReservationSerializer(carRes, many=True)
    carSerializerRents = CarsRentsSerializer(carRent, many=True)

    combine_serializers = carSerializerRents.data + carSerializerReservation.data

    return Response(combine_serializers)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListFilterReservation(request, pk):
    today = timezone.now() + timedelta(hours=12)
    today_minus = timezone.now() - timedelta(hours=12)
    today_plus = timezone.now() + timedelta(hours=12)
    carRes = Cars_Reservation.objects.filter(
        location=pk,
        #date_from__lt = today,
        #date_from__gt = timezone.now(),
        date_from__lt = today_plus,
        date_from__gt = today_minus,
        is_active = True
    ).order_by('date_from')

    serializer = CarsReservationSerializer(carRes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListFilterRents(request, pk):
    today = timezone.now() + timedelta(hours=12)
    carRent = Cars_Rents.objects.filter(
        location=pk,
        date_to__lt = today,
        is_active = True
    ).order_by('date_to')  

    serializer = CarsRentsSerializer(carRent, many=True)  
    return Response(serializer.data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListByLocationReservations(request, pk):
    today = timezone.now()
    carList = Cars.objects.filter(
        carReservations__location=pk,
        carReservations__date_from__gt = today,
        carReservations__is_active = True
    )

    unique_cars_list=[]
    for car in carList:
        if car not in unique_cars_list:
            unique_cars_list.append(car)

    serializer = CarsSerializer(unique_cars_list, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCarListByLocationNewReservations(request, pk):

    carList = Cars.objects.filter(location=pk)

    serializer = CarsSerializer(carList, many=True)

    return Response(serializer.data)


#CAR RESERVATION

def convertDate(str):
    date = str

    year = ""
    mounth=""
    day=''
    hour=''
    minutes=''
    a=0  #iterator
    b=0  #flaga
    for i in date:
        if i == "-" and b==0:
            year = date[0:a]
            if date[a+2] =='-':
                mounth=date[5:a+2]
            else:
                mounth=date[5:a+3]
            b=1
        if i == "-" and b==1:
            if date[a+2] ==' ':
                day=date[a+1:a+2]
            else:
                day=date[a+1:a+3]
        if i == " ":
            if date[a+2] ==':':
                hour=date[a+1:a+2]
            else:
                hour=date[a+1:a+3]
        if i == ":":
            minutes=date[a+1:]            
        a+=1
    return datetime(int(year),int(mounth),int(day),int(hour),int(minutes), tzinfo=pytz.UTC)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReservationCar(request):
    data = request.data
    date_obj_start = convertDate(data['dateFrom'])
    date_obj_end = convertDate(data['dateTo'])
   
    obj_car = Cars.objects.get(id=data['idCars'])
    obj_location = Locations.objects.get(id=data['location'])

    obj_reservations = Cars_Reservation.objects.filter(id_cars=data['idCars'], is_active=True)
    obj_rents = Cars_Rents.objects.filter(id_cars=data['idCars'], is_active=True)

    if data['location'] == obj_car.location:
        extension = timedelta(milliseconds=data['timeReservation'])
    else:
        extension = timedelta(milliseconds=data['timeReservation'] + data['transferTime'])  

    for res in obj_reservations:
        if date_obj_start > (res.date_from-extension) and date_obj_start < (res.date_to + extension):
            return Response('zakres dat istnieje dla dataStart')
        if date_obj_end > (res.date_from-extension) and date_obj_end < (res.date_to + extension):
            return Response('zakres dat istnieje dla dataEnd')
        if date_obj_start < (res.date_from-extension) and date_obj_end > (res.date_to + extension):
            return Response('zawarty zakres dat')

    for ren in obj_rents:
        if date_obj_start > (ren.date_from-extension) and date_obj_start < (ren.date_to + extension):
            return Response('zakres dat najmu istnieje dla dataStart')
        if date_obj_end > (ren.date_from-extension) and date_obj_end < (ren.date_to + extension):
            return Response('zakres dat najmu istnieje dla dataEnd')
        if date_obj_start < (ren.date_from-extension) and date_obj_end > (ren.date_to + extension):
            return Response('zawarty zakres dat dla najmu')


    try:
        car_reservation = Cars_Reservation.objects.create(
            id_cars = obj_car,
            client_name= data['name'],
            client_document_type= data['documentType'],
            client_document_identification = data['IdNumber'],
            client_phone = data['phone'],
            client_email = data['email'],
            date_from = date_obj_start,
            date_to = date_obj_end,
            note = data['note'],
            location = obj_location,
            creator = data['creator']
        )

        return Response('Success')

    except:
        message = {'detail': 'Coś poszło nie tak'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listReservationCar(request,pk, loc):

    if loc == '0':
        carListReservation = Cars_Reservation.objects.filter(id_cars=pk, is_active=True)
    else:
        carListReservation = Cars_Reservation.objects.filter(id_cars=pk, is_active=True, location=loc)

    carListReservationGroupBy= carListReservation.order_by('date_from')
    serializer = CarsReservationSerializer(carListReservationGroupBy, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def deleteReservation(request, pk):
    data = request.data
    reservationForDeletion = Cars_Reservation.objects.get(id=pk)

    reservationForDeletion.is_active = False
    reservationForDeletion.date_of_change = timezone.now()
    reservationForDeletion.creator_change = data['creator']
    reservationForDeletion.type_change = data['type_change']
    reservationForDeletion.id_arc = data['id']

    reservationForDeletion.save()
    return Response('Reservation was deleted')
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getReservationById(request, pk):
    reservation = Cars_Reservation.objects.get(id=pk)


    serializer = CarsReservationSerializer(reservation, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateReservation(request, pk):  

    data = request.data
    reservation = Cars_Reservation.objects.get(id=pk)

    obj_car = Cars.objects.get(id=reservation.id_cars.id)
    date_obj_start = convertDate(data['dateFrom'])
    date_obj_end = convertDate(data['dateTo'])

    obj_reservations = Cars_Reservation.objects.filter(id_cars=reservation.id_cars, is_active=True).exclude(id=pk)

    obj_rents = Cars_Rents.objects.filter(id_cars=reservation.id_cars, is_active=True)
    obj_location = Locations.objects.get(id=data['location'])

    for res in obj_reservations:
        if data['location'] == res.location:
            extension = timedelta(milliseconds=data['timeReservation'])
        else:
            extension = timedelta(milliseconds=data['timeReservation'] + data['transferTime'])  

        if date_obj_start > (res.date_from-extension) and date_obj_start < (res.date_to + extension):
            return Response('zakres dat istnieje dla dataStart')
        if date_obj_end > (res.date_from-extension) and date_obj_end < (res.date_to + extension):
            return Response('zakres dat istnieje dla dataEnd')
        if date_obj_start < (res.date_from-extension) and date_obj_end > (res.date_to + extension):
            return Response('zawarty zakres dat')

    for ren in obj_rents:
        if data['location'] == ren.location:
            extension = timedelta(milliseconds=data['timeReservation'])
        else:
            extension = timedelta(milliseconds=data['timeReservation'] + data['transferTime']) 

        if date_obj_start > (ren.date_from-extension) and date_obj_start < (ren.date_to + extension):
            return Response('zakres dat najmu istnieje dla dataStart')
        if date_obj_end > (ren.date_from-extension) and date_obj_end < (ren.date_to + extension):
            return Response('zakres dat najmu istnieje dla dataEnd')
        if date_obj_start < (ren.date_from-extension) and date_obj_end > (ren.date_to + extension):
            return Response('zawarty zakres dat dla najmu')

    try:
        reservation.is_active = False
        reservation.date_of_change = timezone.now()
        reservation.creator_change = data['creator']
        reservation.type_change = data['type']
        reservation.id_arc = data['id']
        reservation.save()
    except:
        message = {'detail': 'Poszło coś nie tak w Udated danych'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    try:
        car_reservation = Cars_Reservation.objects.create(
            id_cars = obj_car,
            client_name= data['name'],
            client_document_type= data['documentType'],
            client_document_identification = data['IdNumber'],
            client_phone = data['phone'],
            client_email = data['email'],
            date_from = date_obj_start,
            date_to = date_obj_end,
            note = data['note'],
            location = obj_location,
            creator = data['creator'], 
            id_arc = data['id'],
            type_change = 'create by update'       
        )
    except:
        reservation.is_active = True
        reservation.save()
        message = {'detail': 'Poszło coś nie tak w Create By Update danych'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)        

    return Response('Operacja zakończona sukcesem')

#CAR RENT

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRentCar(request):
    data = request.data
    date_obj_start = timezone.now()
    date_obj_end = convertDate(data['date_to'])
    
    obj_car = Cars.objects.get(id=data['id_car'])
    obj_location = Locations.objects.get(id=data['location'])

    if data['resToRent'] == 'resToRent':
        obj_reservations = Cars_Reservation.objects.filter(id_cars=data['id_car'], is_active=True).exclude(id=data['id_res'])
        obj_reservation = Cars_Reservation.objects.get(id=data['id_res'])
    else:
        obj_reservations = Cars_Reservation.objects.filter(id_cars=data['id_car'], is_active=True)
    
    obj_rents = Cars_Rents.objects.filter(id_cars=data['id_car'], is_active=True)

    for i in obj_reservations:
        if data['location'] == i.location:
            extension = timedelta(milliseconds=data['setCarRent'])
        else:
            extension = timedelta(milliseconds=data['setCarRent'] + data['transferTime'])

        if date_obj_start > (i.date_from-extension) and date_obj_start < (i.date_to + extension):
            return Response('zakres dat istnieje dla dataStart')
        if date_obj_end > (i.date_from-extension) and date_obj_end < (i.date_to + extension):
            return Response('zakres dat istnieje dla dataEnd')
        if date_obj_start < (i.date_from-extension) and date_obj_end > (i.date_to + extension):
            return Response('zawarty zakres dat')

    for ren in obj_rents:
        if data['location'] == ren.location:
            extension = timedelta(milliseconds=data['setCarRent'])
        else:
            extension = timedelta(milliseconds=data['setCarRent'] + data['transferTime'])

        if date_obj_start > (ren.date_to + extension):
            return Response('samochód nie został odebrany od klienta')
        if date_obj_start > (ren.date_from-extension) and date_obj_start < (ren.date_to + extension):
            return Response('zakres dat najmu istnieje dla dataStart')
        if date_obj_end > (ren.date_from-extension) and date_obj_end < (ren.date_to + extension):
            return Response('zakres dat najmu istnieje dla dataEnd')
        if date_obj_start < (ren.date_from-extension) and date_obj_end > (ren.date_to + extension):
            return Response('zawarty zakres dat dla najmu')    

    try:
        if data['resToRent'] == 'resToRent':
            obj_reservation.is_active = False
            obj_reservation.save()

        car_rent = Cars_Rents.objects.create(
            id_cars = obj_car,
            client_name= data['client_name'],
            client_document_type= data['client_document_type'],
            client_document_identification = data['client_document_identification'],
            client_phone = data['client_phone'],
            client_email = data['client_email'],
            date_to = date_obj_end,
            deposit = data['deposit'],
            deposit_currency = data['deposit_currency'],
            deposit_is_active = data['deposit_is_active'],
            total_price = data['total_price'],
            total_price_currency = data['total_price_currency'],
            total_price_is_paid = data['total_price_is_paid'],
            creator = data['creator'],
            location = obj_location,
            note = data['note']
            
        )

        car_ARC = Cars_ARC.objects.create(
            id_car = obj_car.id,
            id_location = obj_car.main_location.id,
            name= obj_car.name,
            short_name= obj_car.short_name,
            code_registration = obj_car.code_registration,
            creator_ARC = data['creator'], 
            type = 'rent car',
            on_the_way = obj_car.on_the_way,
            location = obj_car.location,
            to_the_location = obj_car.to_the_location,
            come_back = obj_car.come_back
        )
    
        obj_car.on_the_way = True
        obj_car.to_the_location = data['location']
        obj_car.come_back = data['come_back']
        obj_car.save()

        return Response('Car was rent')

    except:
        message = {'detail': 'Poszło coś nie tak'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editCarRent(request, pk):  
    data = request.data   
    today = timezone.now() 
    date_obj_end = convertDate(data['dateTo'])
    obj_location = Locations.objects.get(id=data['location'])
    rent = Cars_Rents.objects.get(id=data['rentId'])
    extension = timedelta(milliseconds=data['duration'])

    reservation = Cars_Reservation.objects.filter(
        id_cars=data['carId'], 
        is_active=True,
        date_from__gt = today)

    for i in reservation:
        if (date_obj_end) > (i.date_from):
            return Response('zakres dat istnieje dla dataEnd')
        if (date_obj_end + extension) > (i.date_from):
            return Response('zakres dat istnieje dla dataEnd + 1h')

    if rent.total_price_is_paid:
        obj_note = "Info z systemu: zapłacone " + rent.total_price +" "+ rent.total_price_currency +"\n"+ data['note']
    else:
        obj_note = data['note']

    try:
        rent.date_to = date_obj_end
        rent.total_price = str(int(rent.total_price) + int(data['totalPrice']))
        rent.total_price_is_paid = False
        rent.note = obj_note
        rent.location = obj_location
        rent.save()
    except:
        message = {'detail': 'Poszło coś nie tak w Udated danych'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)    

    return Response('Operacja zakończona sukcesem')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listRentsCar(request,pk):
    today = timezone.now()
    carListRents = Cars_Rents.objects.filter(id_cars=pk, is_active=True)
    carListRentsGroupBy= carListRents.order_by('date_from')

    serializer = CarsRentsSerializer(carListRentsGroupBy, many=True)

    return Response(serializer.data)

#CAR PICK UP

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRentDetailsByCarId(request,pk):
    carRent = Cars_Rents.objects.get(id_cars=pk, is_active=True)
    
    serializer = CarsRentsSerializer(carRent, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def carUpdateRent(request, pk):  
    carRent = Cars_Rents.objects.get(id=pk, is_active=True)
    car = Cars.objects.get(id=carRent.id_cars.id)

    try:
        carRent.is_active = False
        carRent.save()

        car.on_the_way = False
        car.come_back = False
        car.location = carRent.location.id
        car.save()

        return Response("Success")

    except:
        message = {'detail': 'Błąd serwera'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)





    