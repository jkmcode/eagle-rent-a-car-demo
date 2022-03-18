import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCarsListByLocation, deleteReservation } from '../action/carsAction';

import { Card, ListGroup, Row, Col, Button, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import classNames from 'classnames'
import { CAR_RENT_UPDATE_RESET, CAR_RENT_DETAILS_RESET } from '../constants/CarsConstans';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faCar, 
        faArrowAltCircleLeft, 
        faCalendar, 
        faAddressBook, 
        faEdit,
} from "@fortawesome/free-solid-svg-icons"

import { 
    CAR_LOCATION_LIST_TITLE,
    CAR_LOCATION_LIST_RENT_SUBTITLE,
    CAR_LOCATION_LIST_IN_USE_SUBTITLE,
    CAR_LOCATION_LIST_TO_DO_SUBTITLE,
    CAR_LOCATION_LIST_RESERVATIONS_SUBTITLE,
    CAR_LOCATION_LIST_EDIT_RESERVATION_SUBTITLE,
    CAR_LOCATION_LIST_IN_USE_DATE_SUBTITLE,
    CAR_LOCATION_LIST_EDIT_RESERVATION_FROM_SUBTITLE,
    CAR_LOCATION_LIST_OTHER_LOCATISATION,
    CAR_LOCATION_LIST_FILTERS,

    CAR_LOCATION_LIST_RENT_BTN_NAME,
    CAR_LOCATION_LIST_IN_USE_BTN_NAME,
    CAR_LOCATION_LIST_TO_DO_BTN_NAME,
    CAR_LOCATION_LIST_NEW_RESERVATION_BTN_NAME,
    CAR_LOCATION_LIST_EDIT_RESERVATION_BTN_NAME,
    CAR_LOCATION_LIST_FILTER_ALL_BTN_NAME,
    CAR_LOCATION_LIST_FILTER_RESERVATIONS_BTN_NAME,
    CAR_LOCATION_LIST_FILTER_RENTS_BTN_NAME,
    CAR_LOCATION_LIST_EDIT_BTN,
    CAR_LOCATION_LIST_RENT_BTN,
    CAR_LOCATION_LIST_PICK_UP_BTN,
    CAR_LOCATION_LIST_DELETE_BTN,

    CAR_LOCATION_LIST_CONTACT_INFO_TITLE,
    CAR_LOCATION_LIST_CONTACT_INFO_CLIENT_NAME,
    CAR_LOCATION_LIST_CONTACT_INFO_ID_NO,
    CAR_LOCATION_LIST_CONTACT_INFO_TEL,
    CAR_LOCATION_LIST_CONTACT_INFO_EMAIL,
    CAR_LOCATION_LIST_CONTACT_INFO_DEPOSIT,
    CAR_LOCATION_LIST_CONTACT_INFO_TOTAL_PRICE,

    CAR_LOCATION_LIST_AMOUNT_OF_POSITIONS,

    BTN_SHOW,
    BTN_CALENDAR,
    BTN_PICK_UP,
    BTN_RENT,
    BTN_RESRVATION,
    BTN_EDIT,

    CONDITION_RENT,
    CONDITION_DELAY_RENT,
    CONDITION_RESERVATION,
    CONDITION_DELAY_RESERVATION,

    REQUEST_FAILED_WITH_STATUS_CODE_500,
    REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
    REQUEST_FAILED_REST_OF_STATUS_CODE,  
    CAR_LOCATION_LIST_DELETE_MSG,  
    DELETE,
} from '../constants/EnvConstans'

            


function CarLocationList() {
    const params = useParams()
    const locationId = params.id
    const dispatch = useDispatch()

    const [locationName, setLocationName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    //Fetch data from Redux
    const carsListByLocation = useSelector(state => state.carsListByLocation)
    const {loading, error, cars} = carsListByLocation

    const locationList = useSelector(state => state.locationList)
    const { locations } = locationList

    const carRentDetails = useSelector(state => state.carRentDetails)
    const {rent} = carRentDetails

    const carUpdateRent = useSelector(state => state.carUpdateRent)
    const {rent:carUpdateRentMsg} = carUpdateRent

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const reservationDelete = useSelector(state => state.reservationDelete)
    const { success:successDelete } = reservationDelete

    //Variables related to URL
    const [action, setAction]= useState('edit-to-do')
    const [actionResToRent, setActionResToRent]= useState('res-to-rent')

    //Variables in order to change list
    const [listName, setListName] = useState('to-rent')
    const [listSwitcherRent, setListSwitcherRent] = useState(true)

    const [listSwitcherInUse, setListSwitcherInUse] = useState(false)
    const [listSwitcherInUseSupp, setListSwitcherInUseSupp] = useState(false)
    const [listSwitcherToDo, setListSwitcherToDo] = useState(false)
    const [listSwitcherToDoSupp, setListSwitcherToDoSupp] = useState(false)

    const [listSwitcherReservations, setListSwitcherReservations] = useState(false)
    const [listSwitcherEditReservations, setListSwitcherEditReservations] = useState(false)

    //Filter
    const [filterReservations, setFilterReservations] = useState(false)
    const [filterRents, setFilterRents] = useState(false)
    const [filterAll, setFilterAll] = useState(true)


    //variables related to show info
    const [moreInfo, setMoreInfo] = useState(false)
    const [iterator, setIterator] = useState(0)
    const [lessInfo, setLessInfo] = useState(false)


    const listSwitcherHandlerToRent = () => {
        setListSwitcherRent(true)
        setListSwitcherInUse(false)
        setListSwitcherInUseSupp(false)
        setListSwitcherToDo(false)
        setListSwitcherToDoSupp(false)
        setListSwitcherReservations(false)
        setListSwitcherEditReservations(false)
        setListName('to-rent')

    }

    const listSwitcherHandlerInUse = () => {
        setListSwitcherRent(false)
        setListSwitcherInUse(true)
        setListSwitcherInUseSupp(false)
        setListSwitcherToDo(false)
        setListSwitcherReservations(false)
        setListSwitcherEditReservations(false)
        setListName('in-use')
    }

    const listSwitcherHandlerToDo = () => {
        setListSwitcherRent(false)
        setListSwitcherInUse(false)
        setListSwitcherInUseSupp(false)
        setListSwitcherToDo(true)
        setListSwitcherReservations(false)
        setListSwitcherEditReservations(false)
        setListName('to-do')
    }

    const listSwitcherHandlerReservations = () => {
        setListSwitcherRent(false)
        setListSwitcherInUse(false)
        setListSwitcherInUseSupp(false)
        setListSwitcherToDo(false)
        setListSwitcherToDoSupp(false)
        setListSwitcherReservations(true)
        setListSwitcherEditReservations(false)
        setListName('new-reservation')
    }

    const listSwitcherHandlerEditReservations = () => {
        setListSwitcherRent(false)
        setListSwitcherInUse(false)
        setListSwitcherInUseSupp(false)
        setListSwitcherToDo(false)
        setListSwitcherToDoSupp(false)
        setListSwitcherReservations(false)
        setListSwitcherEditReservations(true)
        setListName('reservations')
    }

 
    //Functions related to filters in "ToDo"
    const filterReservationsHandler = () => {
        setFilterAll(false)
        setFilterReservations(true)
        setFilterRents(false)
        setListName('fiter-reservations')
    }

    const filterRentsHandler = () => {
        setFilterAll(false)
        setFilterReservations(false)
        setFilterRents(true)
        setListName('fiter-rents')
    }

    const filterAllHandler = () => {
        setFilterAll(true)
        setFilterReservations(false)
        setFilterRents(false)
        setListName('fiter-all')
    }
    

    const moreInfoHandler = (index) => {

        if(moreInfo && index===iterator) {
            setMoreInfo(false)
            setLessInfo(false)
            setIterator(0)
        }else{
            setMoreInfo(true)
            setLessInfo(true)
            setIterator(index)
        }
    }

    // delete function 
    const deleteHandler = (id) =>{
        if(window.confirm(CAR_LOCATION_LIST_DELETE_MSG)){
            dispatch(deleteReservation({
              'id':id,
              'creator':userInfo.id,
              'type_change': 'delete'
            }))
        }
    }

    //UseEffect to change lists and upload list of cars after delete reservation
    useEffect(() =>{
        const location = locations.map(loc =>{
            if(loc.id == locationId){
                setLocationName(loc.short_name)
            }
        })

        if(listSwitcherToDo){
            setListSwitcherInUseSupp(false)
            setListSwitcherToDoSupp(true)
        }

        if(listSwitcherInUse){
            setListSwitcherToDoSupp(false)
            setListSwitcherInUseSupp(true)
            setListSwitcherInUse(false)
        }

        dispatch(getCarsListByLocation({
            'locationId': locationId,
            'listName':  listName
        }))

        if(rent.client_name){
            dispatch({type:CAR_RENT_DETAILS_RESET})
            dispatch({type:CAR_RENT_UPDATE_RESET})
        }


    }, [listSwitcherRent,
        listSwitcherInUse,
        listSwitcherToDo, 
        listSwitcherReservations, 
        listSwitcherEditReservations,
        filterReservations,
        filterRents,
        successDelete,
        locationId
    ]) 

    //UseEffect - releted to Error with database connection
    useEffect(() => {
        if(error){
            if(error===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setErrorMessage(REQUEST_FAILED_REST_OF_STATUS_CODE)
            }   
        }
  
    }, [error])
    
    return (
        <main>
            <Header />
            <FormContainer>
            {loading
                ? (<Loader/>)
                : error
                ? (<Message variant='danger'>{errorMessage}</Message>)
                : (
                    <section>
                        <h3>{CAR_LOCATION_LIST_TITLE} {locationName}</h3>
                        {listSwitcherRent ? <h4>{CAR_LOCATION_LIST_RENT_SUBTITLE}</h4> : null}
                        {listSwitcherInUseSupp ? <h4>{CAR_LOCATION_LIST_IN_USE_SUBTITLE}</h4> : null}
                        {listSwitcherToDo ? <h4>{CAR_LOCATION_LIST_TO_DO_SUBTITLE}</h4> : null}
                        {listSwitcherReservations ? <h4>{CAR_LOCATION_LIST_RESERVATIONS_SUBTITLE}</h4> : null}
                        {listSwitcherEditReservations ? <h4>{CAR_LOCATION_LIST_EDIT_RESERVATION_SUBTITLE}</h4> : null}
                        
                        <Row>
                            <Col className='car-list-location-position'>
                                <Button 
                                    className={listSwitcherRent ? 'btn-bg-car-list-location mb-1' : 'btn-car-list-location mb-1'}
                                    onClick={listSwitcherHandlerToRent}
                                >
                                    {CAR_LOCATION_LIST_RENT_BTN_NAME}
                                </Button>
                                <Button 
                                    className={listSwitcherInUseSupp ? 'btn-bg-car-list-location mb-1' : 'btn-car-list-location mb-1'}
                                    onClick={listSwitcherHandlerInUse}
                                >
                                    {CAR_LOCATION_LIST_IN_USE_BTN_NAME}
                                </Button>
                                <Button 
                                    className={listSwitcherToDo ? 'btn-bg-car-list-location mb-1' : 'btn-car-list-location mb-1'}
                                    onClick={listSwitcherHandlerToDo}
                                >
                                    {CAR_LOCATION_LIST_TO_DO_BTN_NAME}
                                </Button>
                                <Button 
                                    className={listSwitcherReservations ? 'btn-bg-car-list-location mb-1' : 'btn-car-list-location mb-1'}
                                    onClick={listSwitcherHandlerReservations}
                                >
                                    {CAR_LOCATION_LIST_NEW_RESERVATION_BTN_NAME}
                                </Button>
                                <Button 
                                    className={listSwitcherEditReservations ? 'btn-bg-car-list-location mb-1' : 'btn-car-list-location mb-1'}
                                    onClick={listSwitcherHandlerEditReservations}
                                >
                                    {CAR_LOCATION_LIST_EDIT_RESERVATION_BTN_NAME}
                                </Button>
                            </Col>
                        </Row>
                        {listSwitcherToDoSupp
                            ? 
                            <div>
                                <hr />
                                <h4>{CAR_LOCATION_LIST_FILTERS}</h4>
                                    <Button 
                                        className={filterAll ? 'btn-bg-car-list-location' : 'btn-car-list-location'}
                                        onClick={filterAllHandler}
                                    >
                                        {CAR_LOCATION_LIST_FILTER_ALL_BTN_NAME}
                                    </Button> 
                                    <Button 
                                        className={filterReservations ? 'btn-bg-car-list-location' : 'btn-car-list-location'}
                                        onClick={filterReservationsHandler}
                                    >
                                        {CAR_LOCATION_LIST_FILTER_RESERVATIONS_BTN_NAME} 
                                    </Button> 
                                    <Button 
                                        className={filterRents ? 'btn-bg-car-list-location' : 'btn-car-list-location'}
                                        onClick={filterRentsHandler}
                                    >
                                        {CAR_LOCATION_LIST_FILTER_RENTS_BTN_NAME}
                                    </Button> 
                                <hr />  
                                <h4 className='mb-3'>{CAR_LOCATION_LIST_AMOUNT_OF_POSITIONS} {cars.length}</h4>                             
                                {cars.map((car, index)=> (
                                    <Card key= {index} className='mb-3'>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item 

                                                className={classNames('card-list-color',
                                                {
                                                 'card-list-color-rent': car.type === CONDITION_RENT,
                                                 'card-list-color-rent-delay': car.type === CONDITION_DELAY_RENT,
                                                 'card-list-color-reservation': car.type === CONDITION_RESERVATION,
                                                 'card-list-color-reservation-delay': car.type === CONDITION_DELAY_RESERVATION
                                                })}
                                            >
                                                <Row>
                                                    <Col>
                                                        {locationId != car.id_cars.location
                                                            ?
                                                            <div>
                                                                <h4 className='other-location-title'>
                                                                    {CAR_LOCATION_LIST_OTHER_LOCATISATION}
                                                                </h4>
                                                            </div> 
                                                            : null
                                                        }
                                                   
                                                        <div>
                                                            <h4>{car.id_cars.short_name}</h4>
                                                        </div>

                                                        <div>
                                                            <h5 className='car-registration-style'>{car.id_cars.code_registration}</h5>
                                                        </div>
                                                        {car.type === CONDITION_RESERVATION || car.type === CONDITION_DELAY_RESERVATION
                                                            ?
                                                                <div>
                                                                    <h6 className='reservation-from-title'>{CAR_LOCATION_LIST_EDIT_RESERVATION_FROM_SUBTITLE}</h6>
                                                                    <div>
                                                                        {car.start_year}
                                                                        -{car.start_month > 9 ? car.start_month : `0${car.start_month}`}
                                                                        -{car.start_day > 9 ? car.start_day : `0${car.start_day}`},  
                                                                        {car.start_hour > 9 ? car.start_hour : `0${car.start_hour}`}
                                                                        :{car.start_minute>9 ? car.start_minute : `0${car.start_minute}`}                                                                    
                                                                    </div>
                                                                </div>
                                                            : null                                                                                                                 
                                                        }
                                                        {car.type === CONDITION_RENT || car.type === CONDITION_DELAY_RENT
                                                            ?
                                                                <div>
                                                                    {car.end_year}
                                                                    -{car.end_month > 9 ? car.end_month : `0${car.end_month}`}
                                                                    -{car.end_day > 9 ? car.end_day : `0${car.end_day}`},  
                                                                    {car.end_hour > 9 ? car.end_hour : `0${car.end_hour}`}
                                                                    :{car.end_minute>9 ? car.end_minute : `0${car.end_minute}`}
                                                                </div>
                                                            : null                                                                                                                 
                                                        }

                                                        <div>
                                                            <Image src = {car.id_cars.image} className='car-admin-img-sizing'/>
                                                        </div>
                                                        <div>
                                                            <h5>{car.type}</h5>
                                                        </div>
                                                        <hr />
                                                        <div>
                                                            <Button
                                                                variant='info' 
                                                                className='btn-md btn-show-to-do'
                                                                onClick={() => moreInfoHandler(index + 1)}
                                                            >
                                                                {BTN_SHOW} 
                                                            </Button>

                                                            {(index + 1 === iterator)
                                                                ? 
                                                                <div>
                                                                    <h5>{CAR_LOCATION_LIST_CONTACT_INFO_TITLE}</h5>
                                                                    <div>
                                                                        <h6>{CAR_LOCATION_LIST_CONTACT_INFO_CLIENT_NAME} {car.client_name}</h6>
                                                                        <h6>{car.client_document_type}, {CAR_LOCATION_LIST_CONTACT_INFO_ID_NO} {car.client_document_identification}</h6>
                                                                        <h6>{CAR_LOCATION_LIST_CONTACT_INFO_TEL} {car.client_phone}</h6>
                                                                        {car.client_email
                                                                            ? <h6>{CAR_LOCATION_LIST_CONTACT_INFO_EMAIL} {car.client_email}</h6>
                                                                            : null
                                                                        }
                                                                        {car.type === CONDITION_RENT
                                                                            ? 
                                                                            <div>
                                                                                <h6>{CAR_LOCATION_LIST_CONTACT_INFO_DEPOSIT} {car.deposit} {car.deposit_currency}</h6>
                                                                                <h6>{CAR_LOCATION_LIST_CONTACT_INFO_TOTAL_PRICE} {car.total_price} {car.total_price_currency}</h6>
                                                                            </div> 
                                                                            : null
                                                                        }
                                                                    </div> 
                                                                </div>                                                       
                                                                : null
                                                            }
                                                        </div>



                                                    </Col>
                                                    <Col className='carslist-position'>
                                                    {car.type === CONDITION_RESERVATION || car.type === CONDITION_DELAY_RESERVATION
                                                        ?
                                                        
                                                        <div>
                                                            <div>
                                                                <LinkContainer to={`/reservation/car/${locationId}/${car.id_cars.id}/${action}/${car.id}`}>
                                                                    <Button variant='warning' className='btn-md'>
                                                                        <FontAwesomeIcon icon={faEdit} /> {CAR_LOCATION_LIST_EDIT_BTN} 
                                                                    </Button> 
                                                                </LinkContainer> 
                                                            </div>
                                                            <div className='mt-1'>
                                                                <LinkContainer to={`/car/${car.id_cars.id}/rent/${locationId}/${actionResToRent}/${car.id}`}>
                                                                    <Button variant='info' className='btn-md'>
                                                                        <FontAwesomeIcon icon={faCar} /> {CAR_LOCATION_LIST_RENT_BTN} 
                                                                    </Button> 
                                                                </LinkContainer> 
                                                            </div>
                                                            <div className='mt-1'>
                                                                    <Button 
                                                                        variant='danger' 
                                                                        className='btn-md'
                                                                        onClick={() => deleteHandler(car.id)}
                                                                    >
                                                                        <i className={DELETE}></i>{CAR_LOCATION_LIST_DELETE_BTN}
                                                                    </Button>  
                                                            </div>
                                                        </div>
                                                        : null
                                                    }

                                                    {car.type === CONDITION_RENT || car.type === CONDITION_DELAY_RENT
                                                        ?
                                                        <div>
                                                            <div>
                                                                <LinkContainer to={`/car/${car.id_cars.id}/pick-up/${locationId}`}>
                                                                    <Button className='btn-md btn-pickup'>
                                                                        <FontAwesomeIcon icon={faArrowAltCircleLeft} /> {CAR_LOCATION_LIST_PICK_UP_BTN}
                                                                    </Button> 
                                                                </LinkContainer>
                                                            </div>
                                                            <div className='mt-1'>
                                                                <LinkContainer to={`/car/${car.id_cars.id}/rent/edit/${car.id}/location/${locationId}`}>
                                                                    <Button variant='warning' className='btn-md'>
                                                                        <FontAwesomeIcon icon={faEdit} /> {CAR_LOCATION_LIST_EDIT_BTN}
                                                                    </Button> 
                                                                </LinkContainer>
                                                            </div>
                                                        </div>
                                                        :null                                                         
                                                    }                                 
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                ))}
                            </div>
                        : listSwitcherInUseSupp
                            ? 
                                <div>
                                    {cars.map(car=> (
                                        <Card key={car.id_cars.id} className='mb-3'>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item 
                                                    className={classNames('card-list-color',
                                                    {
                                                    'card-list-color-rent': car.type === CONDITION_RENT,
                                                    'card-list-color-rent-delay': car.type === CONDITION_DELAY_RENT,
                                                    })}  
                                                >
                                                    <Row>
                                                        <Col>
                                                            {car.id
                                                                ?
                                                                <div>
                                                                    <div>
                                                                        <h5>{car.id_cars.short_name}</h5>
                                                                    </div>

                                                                    <div>
                                                                        <h5 className='car-registration-style'>{car.id_cars.code_registration}</h5>
                                                                    </div>
                                                                    <div>
                                                                        <div>{CAR_LOCATION_LIST_IN_USE_DATE_SUBTITLE}</div>
                                                                        {car.end_year}
                                                                        -{car.end_month > 9 ? car.end_month : `0${car.end_month}`}
                                                                        -{car.end_day > 9 ? car.end_day : `0${car.end_day}`},  
                                                                        {car.end_hour > 9 ? car.end_hour : `0${car.end_hour}`}
                                                                        :{car.end_minute>9 ? car.end_minute : `0${car.end_minute}`}
                                                                    </div>
                                                                    <div>
                                                                        <Image src = {car.id_cars.image} className='car-admin-img-sizing'/>
                                                                    </div>
                                                                    <h5>{car.type}</h5>                                                                   
                                                                </div>
                                                                :null
                                                            }

                                                        </Col>

                                                        <Col className='carslist-position'>
                                                            <section>
                                                                <div className='mt-1'>
                                                                    <LinkContainer to={`/car/${car.id_cars.id}/show/in-use/${locationId}`}>  
                                                                        <Button variant='info' className='btn-md'>
                                                                            <FontAwesomeIcon icon={faCalendar} /> {BTN_CALENDAR}
                                                                        </Button>
                                                                    </LinkContainer> 
                                                                </div> 
                                                                <div>
                                                                    <LinkContainer to={`/car/${car.id_cars.id}/pick-up/${locationId}`}> 
                                                                        <Button variant='success' className='btn-md btn-pickup mt-1'>
                                                                            <FontAwesomeIcon icon={faArrowAltCircleLeft} /> {BTN_PICK_UP} 
                                                                        </Button>
                                                                    </LinkContainer>
                                                                </div> 
                                                                <div className='mt-1'>
                                                                    <LinkContainer to={`/car/${car.id_cars.id}/rent/edit/${car.id}/location/${locationId}`}>
                                                                        <Button variant='warning' className='btn-md'>
                                                                            <FontAwesomeIcon icon={faEdit} /> {CAR_LOCATION_LIST_EDIT_BTN}
                                                                        </Button> 
                                                                    </LinkContainer>
                                                                </div>
                                                            </section>                                                                                                                                                           </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    ))}
                                </div>
                            :
                                <div>
                                    {cars.map(car=> (
                                        <Card key={car.id} className='mb-3'>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className = 'card-list-color'>
                                                    <Row>
                                                        <Col>
                                                            <div>
                                                                <h4>{car.short_name}</h4>
                                                            </div>

                                                            <div>
                                                                <h5 className='car-registration-style'>{car.name}</h5>
                                                            </div>

                                                            <div>
                                                                <h5 className='car-registration-style'>{car.code_registration}</h5>
                                                            </div>

                                                            <div>
                                                                <Image src = {car.image} className='car-admin-img-sizing'/>
                                                            </div>
                                                        </Col>

                                                        <Col className='carslist-position'>
                                                            {listSwitcherRent
                                                                ? 
                                                                    <div>
                                                                        <LinkContainer to={`/car/${car.id}/rent/${locationId}`}> 
                                                                            <Button variant='info' className='btn-md'>
                                                                                <FontAwesomeIcon icon={faCar} /> {BTN_RENT} 
                                                                            </Button>
                                                                        </LinkContainer> 
                                                                    </div>                                                
                                                                : null                                                      
                                                            }
                                                            {listSwitcherInUse
                                                                ? 
                                                                <section>
                                                                    <div>
                                                                        
                                                                        <LinkContainer to={`/car/${car.id}/pick-up/${locationId}`}> 
                                                                            <Button variant='warning' className='btn-md mb-2'>
                                                                                <FontAwesomeIcon icon={faArrowAltCircleLeft} /> {BTN_PICK_UP} 
                                                                            </Button>
                                                                        </LinkContainer>
                                                                    </div> 
                                                                    <div>
                                                                        <LinkContainer to={`/car/${car.id}/show`}>  
                                                                            <Button variant='info' className='btn-md'>
                                                                                <FontAwesomeIcon icon={faCalendar} /> {BTN_CALENDAR} 
                                                                            </Button>
                                                                        </LinkContainer> 
                                                                    </div> 
                                                                </section>                                              
                                                                : null                                                      
                                                            }

                                                            {listSwitcherReservations
                                                                ? 
                                                                    <div>
                                                                        <LinkContainer to={`/car/${car.id}/show/id-location/${locationId}`}>  
                                                                            <Button variant='warning' className='btn-md'>
                                                                                <FontAwesomeIcon icon={faAddressBook} /> {BTN_RESRVATION}
                                                                            </Button>
                                                                            
                                                                        </LinkContainer> 
                                                                    </div>                                               
                                                                : null                                                      
                                                            }

                                                            {listSwitcherEditReservations
                                                                ? 
                                                                    <div> 
                                                                        <LinkContainer to={`/car/${car.id}/${locationId}/edit-reservation`}>  
                                                                            <Button variant='warning' className='btn-md'>
                                                                                <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT}
                                                                            </Button>
                                                                        </LinkContainer> 
                                                                    </div>                                    
                                                                : null                                                      
                                                            }

                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    ))}
                                </div>                            
                        }    
                    </section>
                ) 
            }
            </FormContainer>

        </main>

    )
}

export default CarLocationList;


