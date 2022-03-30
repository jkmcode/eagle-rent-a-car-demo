import React,{ useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { Image, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCarDetails } from '../action/carsAction';
import { LinkContainer } from 'react-router-bootstrap';
import { listOfCarOfReservations, listOfCarOfRents } from '../action/carsAction'
import { scroller } from "react-scroll";
import BackLogin from './BackToLogin';
import format from "date-fns/format";
import { pl } from "date-fns/locale";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"

import {
    CAR_SHOW_REGISTRATION_NO_TITLE,
    BTN_BACK,
    BTN_ADD_RESRVATION
} from '../constants/EnvConstans'


function CarShow() {

    const params = useParams()
    const carId = params.id
    const locationId = params.idLocation
    const action = params.action
    const idRent = params.idRent
    const idRes = params.idRes

    const dispatch = useDispatch()

    const carDetails = useSelector(state => state.carDetails)
    const { car } = carDetails

    const carsListReservation = useSelector(state => state.carsListReservation)
    const {reservations} = carsListReservation

    const carsListRents = useSelector(state => state.carsListRents)
    const {rents} = carsListRents

    const locales = {
        "pl": pl
    };


    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    const events = []


    if(reservations){
        reservations.map(res => (
            events.push({
                title: `Rezerwacja -- ${res.client_name}, ${res.client_phone}, wynajęcie w lokalizacji: ${res.location.short_name}`,
                allDay: false,
                start: new Date(res.start_year,(res.start_month-1),res.start_day,res.start_hour,res.start_minute),
                end: new Date(res.end_year,(res.end_month -1),res.end_day,res.end_hour,res.end_minute),
                color: '#ff9900'
            }) 
        ))}


    if(rents){
        rents.map(ren => (
            events.push({
                title: `Najem -- ${ren.client_name}, ${ren.client_phone}, odbiór w lokalizacji: ${ren.location.short_name}`,
                allDay: false,
                start: new Date(ren.start_year,(ren.start_month-1),ren.start_day,ren.start_hour,ren.start_minute),
                end: new Date(ren.end_year,(ren.end_month -1),ren.end_day,ren.end_hour,ren.end_minute),
                color: '#000066'
            }) 
        ))}


    useEffect(() =>{
        scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})
        dispatch(listOfCarOfReservations({
            'carId': carId,
            'locationId': '0'
        }))
        dispatch(listOfCarOfRents(carId))
        dispatch(getCarDetails(carId))
        
    }, [])  

    return (
        <main>
            <BackLogin />
            <Header />
            <FormContainer>
                <Row>
                    <Col>
                        <Image src = {car.image} className='car-show-img-sizing'/>
                        <h4> {car.name}</h4>
                        <h6> {CAR_SHOW_REGISTRATION_NO_TITLE} {car.code_registration}</h6>
                    </Col>
                    {locationId && action == 'edit' 
                    ?                     
                        <Col className="btn-position">
                            <LinkContainer to={`/car/${carId}/rent/edit/${idRent}/location/${locationId}`}> 
                                <Button className='btn-car-show-reservation'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                </Button>
                            </LinkContainer>  
                        </Col>  
                    : null
                    }

                    {locationId && action == 'rent' 
                    ?
                        <Col className="btn-position">
                            <LinkContainer to={`/car/${carId}/rent/${locationId}`}> 
                                <Button className='btn-car-show-reservation'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK} 
                                </Button>
                            </LinkContainer>  
                        </Col>
                    :null
                    }  
                    {locationId && action == 'edit-to-do' 
                    ?
                        <Col className="btn-position">
                            <LinkContainer to={`/reservation/car/${locationId}/${carId}/${action}/${idRes}`}> 
                                <Button className='btn-car-show-reservation'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK} 
                                </Button>
                            </LinkContainer>  
                        </Col>
                    :null
                    }                        

                    {(locationId && action == 'id-location') ||  action == 'search-reservation'
                        ?
                            <Col className="btn-position">
                                {locationId
                                    ?
                                        <div>
                                            <LinkContainer to={`/mainpage/${locationId}/car-list`}> 
                                                <Button className='btn-car-show-reservation m-1'>
                                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                                </Button>
                                            </LinkContainer> 

                                            <LinkContainer to={`/car/${carId}/reservation/id-location/${locationId}`}> 
                                                <Button className='btn-car-show-reservation'>
                                                    <i className="fas fa-plus"></i> {BTN_ADD_RESRVATION}
                                                </Button>
                                            </LinkContainer> 
                                        </div>
                                    :
                                        <div>
                                            <LinkContainer to={`/search/reservation/search-reservation`}> 
                                                <Button className='btn-car-show-reservation m-1'>
                                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                                </Button>
                                            </LinkContainer> 

                                            <LinkContainer to={`/car/${carId}/reservation/id-location/${car.location}/storage`}> 
                                                <Button className='btn-car-show-reservation'>
                                                    <i className="fas fa-plus"></i> {BTN_ADD_RESRVATION}
                                                </Button>
                                            </LinkContainer> 
                                        </div>                                    
                                } 
                            </Col>  
                        :null
                    }

                    {locationId && action == 'edit-reservation' 
                        ?
                            <Col className="btn-position">
                                <LinkContainer to={`/car/${carId}/${locationId}/edit-reservation`}> 
                                    <Button className='btn-car-show-reservation m-1'>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                    </Button>
                                </LinkContainer> 
                            </Col>  
                        :null
                    }

                    {locationId && action == 'single-edit' 
                        ?
                            <Col className="btn-position">
                                <LinkContainer to={`/reservation/car/${locationId}/${carId}/single-edit/${idRes}`}> 
                                    <Button className='btn-car-show-reservation m-1'>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                    </Button>
                                </LinkContainer> 
                            </Col>  
                        :null
                    }

                    {locationId && action == 'res-to-rent' 
                        ?
                            <Col className="btn-position">
                                <LinkContainer to={`/car/${carId}/rent/${locationId}/res-to-rent/${idRes}`}> 
                                    <Button className='btn-car-show-reservation m-1'>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                    </Button>
                                </LinkContainer> 
                            </Col>  
                        :null
                    }

                    {locationId && action == 'in-use'
                        ?  
                            <Col className="btn-position">
                                <LinkContainer to={`/mainpage/${locationId}/car-list`}> 
                                    <Button className='btn-car-show-reservation m-1'>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                    </Button>
                                </LinkContainer> 
                            </Col>  
                        :null                    
                    }

                    {action == 'admin'
                        ?  
                            <Col className="btn-position">
                                <LinkContainer to={`/admin/cars`}> 
                                    <Button className='btn-car-show-reservation m-1'>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                    </Button>
                                </LinkContainer> 
                            </Col>  
                        :null                    
                    }
                </Row>
            </FormContainer>
            <Calendar 
                culture={"pl"}
                localizer={localizer}
                events={events} 
                startAccessor="start" 
                endAccessor="end"
                views={['month', 'agenda']}
                className = 'calendar'

                messages={{
                    next: "Dalej",
                    previous: "Wróć",
                    today: "Dzisiaj",
                    month: "Miesiąc",
                    date: "Data", 
                    time: "Czas",
                    event: "Wydarzenie",
                    noEventsInRange: 'Brak wyników.',
                    allDay: 'Cały dzień'
                }}

                eventPropGetter={(event, start, end, isSelected) => ({
                    event,
                    start,
                    end,
                    isSelected,
                    style: 
                        { 
                            backgroundColor: event.color, 
                            color: "white",
                            opacity: 0.9,
                            margin: 1,
                            fontSize: 14
                        }

                })}
            />
        </main>
    )
}

export default CarShow
