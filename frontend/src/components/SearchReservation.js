import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { Card, ListGroup, Form, Button , Row, Col, Image  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { scroller } from "react-scroll";
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { filterReservations } from '../action/carsAction';
import { SEARCH_RESERVATIONS_RESET } from '../constants/CarsConstans'
import Loader from './Loader';
import Message from './Message';
import BackLogin from './BackToLogin';

import {
    SEARCH_RESERVATION_TITLE,
    SEARCH_RESERVATION_SUBTITLE,
    SEARCH_RESERVATION_FROM_TITLE,
    SEARCH_RESERVATION_FROM,
    SEARCH_RESERVATION_TIME_FROM,
    SEARCH_RESERVATION_TO_TITLE,
    SEARCH_RESERVATION_TO,
    SEARCH_RESERVATION_TIME_TO,

    TIME_MIN_VALUE,
    TIME_MAX_VALUE,
    TIME_STEP,
    TIME_DEFAULT_VALUE_START,
    TIME_DEFAULT_VALUE_END,
    MIN_DURATION,
    MIN_DURATION_MSG,
    WRONG_START_DATE_AND_TIME,

    BTN_NEXT,
    BTN_RESRVATION,

    TRANSFER_TIME,

    SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED,

    REQUEST_FAILED_WITH_STATUS_CODE_500,
    REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
    REQUEST_FAILED_REST_OF_STATUS_CODE

} from '../constants/EnvConstans'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faAddressBook
} from "@fortawesome/free-solid-svg-icons"

function SearchReservation() {

    const dispatch = useDispatch()
    const params = useParams()

    const action = params.action

    registerLocale("pl", pl);
    const [language, setLanguage] = useState("pl")

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    //Fetch data from Redux
    const searchReservations = useSelector(state => state.searchReservations)
    const { loading, error, filter } = searchReservations  

    const locationList = useSelector(state => state.locationList)
    const { locations } = locationList

    //Fetch data from Localstorage
    const fiterRangeofDateFromStorage = localStorage.getItem('filterRangeOfDate') ?
    JSON.parse(localStorage.getItem('filterRangeOfDate')) : null

    //Date and Time variables
    const [newEvent, setNewEvent] = useState({start:"", end:""})
    const [wrongStartDateMsg, setWrongStartDateMsg] = useState('')
    const [wrongEndDateMsg, setWrongEndDateMsg] = useState('')
    const [startDateMsg, setStartDateMsg] = useState('')
    const [endDateMsg, setEndDateMsg] = useState('')
    const [startTimeValue,setStartTimeValue] = useState('')
    const [selectStartTimeMsg, setSelectStartTimeMsg] = useState('')
    const [selectEndTimeMsg, setSelectEndTimeMsg] = useState('')
    const [getStartTimeHoursAndMinutes, setStartTimeGetHoursAndMinutes] = useState('')
    const [getEndTimeHoursAndMinutes, setEndTimeGetHoursAndMinutes] = useState('')
    const [endTimeValue,setEndTimeValue] = useState('')

    //Error handling variables
    const [msgError, setMsgError] = useState('')

    //DateTime function

    const SubmitStartDate = (start) => {
        setNewEvent({ ...newEvent, start })
        setStartDateMsg('')
        setWrongStartDateMsg('')
    }

    const SubmitStartTime = (time) => {
        let getTime = time.nativeEvent.text
        setStartTimeGetHoursAndMinutes(getTime)
        setStartTimeValue(new Date(`01/02/2021 ${getTime.getHours()}:${getTime.getMinutes()}`))
        setSelectStartTimeMsg('')
        setWrongStartDateMsg('')
    } 

    const SubmitEndDate = (end) => {
        setNewEvent({ ...newEvent, end })
        setEndDateMsg('')
        setWrongEndDateMsg('')
    }

    const SubmitEndTime = (time) => {
        let getTime = time.nativeEvent.text
        setEndTimeGetHoursAndMinutes(getTime)
        setEndTimeValue(new Date(`01/02/2021 ${getTime.getHours()}:${getTime.getMinutes()}`))

        setSelectEndTimeMsg('')
        setWrongEndDateMsg('')
    }

    const submitHandler = () => {
        scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})
        let startDateTimeCombiner = newEvent.start
        let endDateTimeCombiner = newEvent.end

        if(!startDateTimeCombiner){
            setStartDateMsg(SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED)
        }

        if(!endDateTimeCombiner){
            setEndDateMsg(SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED)
        }      

        if(getStartTimeHoursAndMinutes){
            if(startDateTimeCombiner){
                startDateTimeCombiner.setHours(getStartTimeHoursAndMinutes.getHours())
                startDateTimeCombiner.setMinutes(getStartTimeHoursAndMinutes.getMinutes())
            }
        }else {
            setSelectStartTimeMsg(SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED)
        } 

        if(getEndTimeHoursAndMinutes){
            if(endDateTimeCombiner){
                endDateTimeCombiner.setHours(getEndTimeHoursAndMinutes.getHours())
                endDateTimeCombiner.setMinutes(getEndTimeHoursAndMinutes.getMinutes())
            }
        }else {
            setSelectEndTimeMsg(SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED)
        } 

        if(!startDateTimeCombiner){
            setStartDateMsg(SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED)
        } else if((startDateTimeCombiner.valueOf() - MIN_DURATION) < new Date().valueOf()) {
            setWrongStartDateMsg(WRONG_START_DATE_AND_TIME)
        }

        if(!endDateTimeCombiner){
            setEndDateMsg(SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED)
        } else if((endDateTimeCombiner.valueOf() - MIN_DURATION) < startDateTimeCombiner.valueOf()) {
            setWrongEndDateMsg(MIN_DURATION_MSG)
        }

        if(
            getStartTimeHoursAndMinutes
            && getEndTimeHoursAndMinutes
            && ((endDateTimeCombiner.valueOf() - MIN_DURATION) > startDateTimeCombiner.valueOf())
            && ((startDateTimeCombiner.valueOf() - MIN_DURATION) > new Date().valueOf())
        ){
            const startYear = startDateTimeCombiner.getFullYear()
            const startMonth = (startDateTimeCombiner.getMonth() +1 )
            const startDay = startDateTimeCombiner.getDate()
            const startHours = startDateTimeCombiner.getHours()
            const startMinutes = startDateTimeCombiner.getMinutes()

            const endYear = endDateTimeCombiner.getFullYear()
            const endMonth = (endDateTimeCombiner.getMonth() +1 )
            const endDay = endDateTimeCombiner.getDate()
            const endHours = endDateTimeCombiner.getHours()
            const endMinutes = endDateTimeCombiner.getMinutes()

            const filter = {
                date_from: `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes}`,
                date_to: `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`,
                time_from: `01/02/2021 ${startHours}:${startMinutes}`,
                time_to: `01/02/2021 ${endHours}:${endMinutes}`, 
                transfer_time: TRANSFER_TIME,             
            }

            localStorage.setItem('filterRangeOfDate', JSON.stringify(filter))

            dispatch(filterReservations(filter))

        }
        
    } 

    //Set Date and Time -- default or based on localStorage 
    useEffect(() => {
        if(!getStartTimeHoursAndMinutes){
            setStartTimeValue(new Date(TIME_DEFAULT_VALUE_START))
            setStartTimeGetHoursAndMinutes(new Date(TIME_DEFAULT_VALUE_START))
        }

        if(!getEndTimeHoursAndMinutes){
            setEndTimeValue(new Date(TIME_DEFAULT_VALUE_END))
            setEndTimeGetHoursAndMinutes(new Date(TIME_DEFAULT_VALUE_END))
        }

        if(fiterRangeofDateFromStorage && action){
            setNewEvent({ ...newEvent, 
                start: new Date(fiterRangeofDateFromStorage.date_from),
                end: new Date(fiterRangeofDateFromStorage.date_to)
            })   
            setStartTimeValue(new Date(fiterRangeofDateFromStorage.time_from))    
            setEndTimeValue(new Date(fiterRangeofDateFromStorage.time_to))     
        }

    }, []) 

    //Error handling related to database connection
    useEffect(() => {
        if(error){
            if(error===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setMsgError(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setMsgError(REQUEST_FAILED_REST_OF_STATUS_CODE)
            } 
        }
        
    }, [error]) 

    //Clear filter and localStorage list from redux 
    useEffect(() => {
        if (!action){
            dispatch({type:SEARCH_RESERVATIONS_RESET})
            localStorage.removeItem('filterRangeOfDate')
        } 
    }, [])     

    return (
        <main>
            <BackLogin />
            <Header />
            <FormContainer>
            {loading
                ? (<Loader />)
                :   error
                    ? (<Message variant='danger'>{msgError}</Message>)
                    :
                    <div>
                        <h3>{SEARCH_RESERVATION_TITLE}</h3>
                        <h4>{SEARCH_RESERVATION_SUBTITLE}</h4>
                        <Form onSubmit={handleSubmit(submitHandler)}>
                            <Form.Group controlId='datePicker'>
                                <Row >
                                    <Col md={4} xs={8}>
                                        <Form.Label className="mt-3">{SEARCH_RESERVATION_FROM_TITLE}</Form.Label>
                                        <DatePicker 
                                            dateFormat="yyyy-MM-dd" 
                                            autoComplete='off'
                                            placeholderText={SEARCH_RESERVATION_FROM}
                                            selected={newEvent.start}
                                            style={{ marginRight: "10px" }} 
                                            className='date-picker-style form-reservation'
                                            onChange={SubmitStartDate}
                                            name = 'dateTo'
                                            locale={language}
                                        />
                                        {startDateMsg ? <p className='docTypeMessage-style'>{startDateMsg}</p> : null}
                                    </Col>
                            
                                    <Col md={2} xs={4}>
                                        <Form.Label className="mt-3">{SEARCH_RESERVATION_TIME_FROM}</Form.Label>
                                        <TimePickerComponent
                                            id="timepicker" 
                                            placeholder="" 
                                            format = "HH:mm"
                                            value = {startTimeValue}
                                            min = {TIME_MIN_VALUE}
                                            max = {TIME_MAX_VALUE}
                                            step={TIME_STEP}
                                            onChange = {SubmitStartTime}
                                        />
                                        {selectStartTimeMsg ? <p className='docTypeMessage-style'>{selectStartTimeMsg}</p> : null}
                                    </Col>
                                    {wrongStartDateMsg ? <p className='docTypeMessage-style'>{wrongStartDateMsg}</p> : null}

                                    <Col md={4} xs={8}>
                                        <Form.Label className="mt-3">{SEARCH_RESERVATION_TO_TITLE}</Form.Label>
                                        <DatePicker 
                                            dateFormat="yyyy-MM-dd" 
                                            autoComplete='off'
                                            placeholderText={SEARCH_RESERVATION_TO}
                                            selected={newEvent.end}
                                            style={{ marginRight: "10px" }} 
                                            className='date-picker-style form-reservation'
                                            onChange={SubmitEndDate}
                                            name = 'dateTo'
                                            locale={language}
                                        />
                                        {endDateMsg ? <p className='docTypeMessage-style'>{endDateMsg}</p> : null}
                                    </Col>
                            
                                    <Col md={2} xs={4}>
                                        <Form.Label className="mt-3">{SEARCH_RESERVATION_TIME_TO}</Form.Label>
                                        <TimePickerComponent
                                            id="timepicker" 
                                            placeholder="" 
                                            format = "HH:mm"
                                            value = {endTimeValue}
                                            min = {TIME_MIN_VALUE}
                                            max = {TIME_MAX_VALUE}
                                            step={TIME_STEP}
                                            onChange = {SubmitEndTime}
                                        />
                                        {selectEndTimeMsg ? <p className='docTypeMessage-style'>{selectEndTimeMsg}</p> : null}
                                    </Col>
                                    {wrongEndDateMsg ? <p className='docTypeMessage-style'>{wrongEndDateMsg}</p> : null}
                                </Row>
                                <Button 
                                    type='submit' 
                                    variant='info' 
                                    className='rounded my-3'
                                >
                                    {BTN_NEXT}
                                </Button>
                            </Form.Group>
                        </Form>
                        <div>
                            {filter[0]
                                ?
                                <div>
                                    {filter.map(car => (
                                        car.id 
                                        ?
                                            <Card key={car.id} className='mb-3'>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item className='card-car-admin-bg'>
                                                        <Row >
                                                            <Col>
                                                                <div>
                                                                    <h4>{car.short_name}</h4>
                                                                </div>

                                                                <div>
                                                                    <h5 className='car-registration-style'>{car.code_registration}</h5>
                                                                </div>

                                                                {locations.map(loc => (
                                                                    loc.id == car.location
                                                                        ? 
                                                                        <h5 key={loc.id} className='car-registration-style'>Lokalizacja: {loc.name}</h5>
                                                                        : null
                                                                ))}

                                                                <div>
                                                                    <Image src = {car.image} className='car-admin-img-sizing'/>
                                                                </div>
                                                            </Col>

                                                            <Col className='carslist-position'>
                                                                <div>
                                                                    <LinkContainer to={`/car/${car.id}/show/search-reservation/`}>
                                                                        <Button variant='warning' className='btn-md'>
                                                                            <FontAwesomeIcon icon={faAddressBook} /> {BTN_RESRVATION}
                                                                        </Button>
                                                                    </LinkContainer>
                                                                </div>
                                                            </Col>
                                                        </Row>                                            
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        : null
                                    ))}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    
            }
        </FormContainer>
        </main>
    )
}

export default SearchReservation