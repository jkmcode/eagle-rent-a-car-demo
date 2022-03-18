import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { Card, ListGroup, Form, Button , Row, Col, Image  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";
import { scroller } from "react-scroll";
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { filterReservations } from '../action/carsAction';
import { FILTER_RESERVATIONS_RESET } from '../constants/CarsConstans'
import Loader from './Loader';
import Message from './Message';

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
    BTN_SHOW,
    BTN_EDIT,

    SEARCH_RESERVATION_DATE_AND_TIME_REQUIRED,
} from '../constants/EnvConstans'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faEdit,
        faAngleDoubleLeft,
        faEye
} from "@fortawesome/free-solid-svg-icons"

function SearchReservation() {

    const dispatch = useDispatch()

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
    const filterListReservations = useSelector(state => state.filterListReservations)
    const { loading, error, filter } = filterListReservations    

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

    //DateTime function

    const SubmitStartDate = (start) => {
        setNewEvent({ ...newEvent, start })
        setStartDateMsg('')
        setWrongStartDateMsg('')
    }

    const SubmitStartTime = (time) => {
        let getTime = time.nativeEvent.text
        setStartTimeGetHoursAndMinutes(getTime)
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
        setSelectEndTimeMsg('')
        setWrongEndDateMsg('')
    }

    const submitHandler = (data) => {
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

             dispatch(filterReservations({
                date_from: `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes}`,
                date_to: `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`,
            }))

        }
        
    }


    //Set default Start Time 
    useEffect(() => {
        if(!getStartTimeHoursAndMinutes){
            setStartTimeValue(new Date(TIME_DEFAULT_VALUE_START))
            setStartTimeGetHoursAndMinutes(startTimeValue)
        }
        if(!getEndTimeHoursAndMinutes){
            setEndTimeValue(new Date(TIME_DEFAULT_VALUE_END))
            setEndTimeGetHoursAndMinutes(endTimeValue)
        }
    }, [startTimeValue, endTimeValue]) 

    //Clear filter list from redux 
    useEffect(() => {
        dispatch({type:FILTER_RESERVATIONS_RESET})
    }, [])     


    return (
        <main>
            <Header />
            {loading
                ? (<Loader />)
                :
                    <FormContainer>
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
                                        <Card key={car.id} className='mb-3'>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item className='card-car-admin-bg'>
                                                    <Row >
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
                                                            <div>
                                                                <LinkContainer to={`/car/${car.id}/show/`}>
                                                                    <Button variant='info' className='btn-md'>
                                                                        <FontAwesomeIcon icon={faEye} /> {BTN_SHOW}
                                                                    </Button>
                                                                </LinkContainer>
                                                            </div>
                                                            <div>
                                                                <LinkContainer to={`/admin/car/${car.id}/edit`}>
                                                                    <Button variant='warning' className='btn-md mt-1'>
                                                                        <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT}
                                                                    </Button>
                                                                </LinkContainer>
                                                            </div>
                                                        </Col>
                                                    </Row>                                            
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    ))}
                                </div>
                                : null
                            }
                        </div>
                    </FormContainer>
            }

        </main>
    )
}

export default SearchReservation