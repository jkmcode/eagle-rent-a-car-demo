import React,{ useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { Image, Form, Button , Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { getCarDetails, getRentDetailsByCarId } from '../action/carsAction';
import { getLocationDetails } from '../action/locationAction';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { scroller } from "react-scroll";
import { updateCarRent } from '../action/carsAction';
import { CAR_RENT_EDIT_RESET } from '../constants/CarsConstans';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faCalendar,  
        faEdit,
        faArrowCircleDown,
        faAngleDoubleLeft,
        faArrowCircleUp

} from "@fortawesome/free-solid-svg-icons"

import { 
    CAR_RENT_EDIT_TITLE,
    CAR_RENT_EDIT_NO_REGISTRATION_SUBTITLE,
    CAR_RENT_EDIT_GENERAL_INFO_SUBTITLE,
    CAR_RENT_EDIT_PAYMENTS_INFO_TITLE,
    CAR_RENT_EDIT_LOCATISATION_SUBTITLE,
    CAR_RENT_EDIT_LOCATION_TITLE,

    CAR_RENT_EDIT_PHONE,
    CAR_RENT_EDIT_CLIENT_NAME,
    CAR_RENT_EDIT_DOC_TYPE,
    CAR_RENT_EDIT_EMAIL,
    CAR_RENT_EDIT_DATE_FROM,
    CAR_RENT_EDIT_DATE_TO,
    CAR_RENT_EDIT_DEPOSIT,
    CAR_RENT_EDIT_TOTAL_PRICE,
    CAR_RENT_EDIT_TOTAL_PRICE_UNPAID,
    CAR_RENT_EDIT_TOTAL_PRICE_PAID,
    CAR_RENT_EDIT_DATEPICKER_TO_TITLE,
    CAR_RENT_EDIT_TIMEPICKER_TO_TITLE,
    CAR_RENT_EDIT_DATE_DATEPICKER,
    CAR_RENT_EDIT_TOTAL_PRICE_TITLE,
    CAR_RENT_EDIT_TOTAL_PRICE_CURRENCY_TITLE,
    CAR_RESERVATION_BUTTON_BACK_TO_MENU,

    CAR_RENT_EDIT_DATE_AND_TIME_REQUIRED,
    CAR_RENT_EDIT_TIME_REQUIRED,
    CAR_RENT_EDIT_INPROPER_DATE,
    CAR_RENT_EDIT_INPROPER_TOTAL_PRICE,
    CAR_RENT_EDIT_TOTAL_PRICE_REQUIRED,
    CAR_RENT_EDIT_REQUIRED_LOCATION,

    CAR_RENT_EDIT_OPTION_0,

    CAR_RESERVATION_BUTTON_NAME,

    CAR_RENT_EDIT_NOTE_TITLE,

    CAR_RENT_EDIT_ERROR_HANDLING_SUCCESS,
    CAR_RENT_EDIT_CREATE_MSG,
    CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1,
    CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG,
    CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2,
    CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG,
    REQUEST_FAILED_WITH_STATUS_CODE_500,
    REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
    REQUEST_FAILED_REST_OF_STATUS_CODE,

    TIME_MIN_VALUE,
    TIME_MAX_VALUE,
    TIME_STEP,
    TIME_DEFAULT_VALUE_END,
    TIME_CLEAR_MSG,
    MIN_DURATION,

    BTN_SHOW_MORE,
    BTN_WRAP_OUT,
    BTN_EDIT
} from '../constants/EnvConstans'

function CarRentEdit() {

    const dispatch = useDispatch()
    const params = useParams()
    const carId = params.id
    const locationId = params.idLocation
    const rentId = params.idRent

    const navigate = useNavigate()

    //change language of DatePicker
    registerLocale("pl", pl)
    const [language, setLanguage] = useState("pl")

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    //Fetch data from Redux
    const locationList = useSelector(state => state.locationList)
    const { locations } = locationList

    const carDetails = useSelector(state => state.carDetails)
    const {loading: loadingCarDetails, car, error:errorCarDetails} = carDetails

    const carRentDetails = useSelector(state => state.carRentDetails)
    const {loading: loadingCarRentDetails, rent, error:errorCarRentDetails} = carRentDetails

    const carEditRent= useSelector(state => state.carEditRent)
    const {loading: loadingCarEditRent, rent: rentCarEditRent, error:errorCarEditRent} = carEditRent   

    const locationDetails = useSelector(state => state.locationDetails)
    const {errorDetailsFail, location:locationInfo} = locationDetails

    //variables related to URL
    const [action, setAction]= useState('edit')

    //variables related to show info 
    const [generalInfo, setGeneralInfo] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState(false)
    const [lessGeneralInfo, setLessGeneralInfo] = useState(false)
    const [lessPaymentlInfo, setLessPaymentInfo] = useState(false)    

    //variables related to date and time
    const [endDate, setEndDate] = useState('')
    const [endDateMsg, setEndDateMsg] = useState('')
    const [wrongBackDateMsg, setWrongBackDateMsg] = useState('')
    const [endTimeValue,setEndTimeValue] = useState('')
    const [getEndTimeHoursAndMinutes, setEndTimeGetHoursAndMinutes] = useState('')
    const [selectEndTimeMsg, setSelectEndTimeMsg] = useState('')

    //form variables
    const [totalPriceMsg, setTotalPriceMsg] = useState('')
    const [location, setLocation] = useState('')

    //Error handling variables
    const [dateMsgSuccess, setDateMsgSuccess] = useState('')
    const [dateMsg, setDateMsg] = useState('')
    const [msgError, setMsgError] = useState('')


    //function from FormSelect
    const selectlocationHandler = () => {
        setLocation('')
    }

    //functions related to date and time
    const SubmitEndDate = (end) => {
        setEndDate(end)
        setEndDateMsg('')
        setWrongBackDateMsg('')
    }

    const SubmitEndTime = (time) => {
        let getTime = time.nativeEvent.text
        setEndTimeGetHoursAndMinutes(getTime)
        setSelectEndTimeMsg('')
        setWrongBackDateMsg('')
    }

    //function related to show info
    const showGeneralInfo = () => {
        if(!generalInfo){
            setGeneralInfo(true)
            setLessGeneralInfo(true)
        }else{
            setGeneralInfo(false)
            setLessGeneralInfo(false)
        }
    }

    const showPaymentInfo = () => {
        if(!paymentInfo){
            setPaymentInfo(true)
            setLessPaymentInfo(true)
        }else{
            setPaymentInfo(false)
            setLessPaymentInfo(false)
        }
    }

    //Form function
    const submitHandler = (data) => {
        scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})

        const endDateTimeCombiner = endDate  
        
        if(!endDateTimeCombiner){
            setEndDateMsg(CAR_RENT_EDIT_DATE_AND_TIME_REQUIRED)
        }

        if(getEndTimeHoursAndMinutes){
            if(endDateTimeCombiner){
                endDateTimeCombiner.setHours(getEndTimeHoursAndMinutes.getHours())
                endDateTimeCombiner.setMinutes(getEndTimeHoursAndMinutes.getMinutes())
            }
        }else{
            setSelectEndTimeMsg(CAR_RENT_EDIT_TIME_REQUIRED)
        }


        if(endDate){
            if ((endDateTimeCombiner - 0) < new Date().valueOf()){
                setWrongBackDateMsg(CAR_RENT_EDIT_INPROPER_DATE)
            }     
        }

        if(data.totalPrice){
            setTotalPriceMsg('')
        }else{
            setTotalPriceMsg(CAR_RENT_EDIT_TOTAL_PRICE_REQUIRED)
        }

        if(data.location === CAR_RENT_EDIT_OPTION_0){
            setLocation(CAR_RENT_EDIT_REQUIRED_LOCATION)
        }

        if( endDateTimeCombiner 
            && getEndTimeHoursAndMinutes
            && endDate
            && ((endDateTimeCombiner - 0) > new Date().valueOf())
            && data.totalPrice
            && (data.location !== CAR_RENT_EDIT_OPTION_0)
        ){

            const endYear = endDateTimeCombiner.getFullYear()
            const endMonth = (endDateTimeCombiner.getMonth() +1 )
            const endDay = endDateTimeCombiner.getDate()
            const endHours = endDateTimeCombiner.getHours()
            const endMinutes = endDateTimeCombiner.getMinutes()

            dispatch(updateCarRent({
                carId: carId,
                rentId: rentId,
                dateTo: `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`,
                note: data.note,
                totalPrice: data.totalPrice,
                location: data.location,
                duration: MIN_DURATION,
            }))
        }
    }

    //Set default endTimeValue
    useEffect(() =>{
        if(!getEndTimeHoursAndMinutes){
            setEndTimeValue(new Date(TIME_DEFAULT_VALUE_END))
            setEndTimeGetHoursAndMinutes(endTimeValue)
        }

    }, [endTimeValue])

    //Fetch carDetails from database
    useEffect(() => {
      if(!errorCarDetails){
        if(!car.name || car.id != carId){
            dispatch(getCarDetails(carId))
        }
      }
    }, [dispatch, car]) 

    //Fetch carRentDetails and locationDetails from database
    useEffect(() => {
      if(!errorCarRentDetails){
        if(!rent.client_name || rent.id_cars.id != carId){
          dispatch(getRentDetailsByCarId(carId))
        }else{
          reset({
            note: rent.note,
            totalCurrency: rent.total_price_currency
          })
        }
      }

      if(!errorDetailsFail){
        if(!locationInfo.name || locationInfo.id !== Number(locationId)){
            dispatch(getLocationDetails(locationId))
        }
      }
    }, [dispatch, rent, locationId, locationInfo])  

    //Error handling and success related to date of range
    useEffect(() => {
        if(rentCarEditRent === CAR_RENT_EDIT_ERROR_HANDLING_SUCCESS){
            dispatch({type:CAR_RENT_EDIT_RESET})
            setDateMsgSuccess(CAR_RENT_EDIT_CREATE_MSG)
            const timeout = setTimeout(() =>{
                navigate(`/mainpage/${locationId}/car-list`)
            }, TIME_CLEAR_MSG) 
        } 

        if(rentCarEditRent===CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1){
            setDateMsg(CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG)
        }

        if(rentCarEditRent===CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2){
            setDateMsg(CAR_RENT_EDIT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG)
        }

    }, [rentCarEditRent])

    //Error handling related to database connection
    useEffect(() => {
        if(errorCarEditRent || errorCarDetails || errorCarRentDetails){
            if(errorCarEditRent===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setMsgError(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setMsgError(REQUEST_FAILED_REST_OF_STATUS_CODE)
            } 
        }
        
    }, [errorCarEditRent, errorCarDetails, errorCarRentDetails])    

    //Error handling remove content 
    useEffect(() => {
        const timeout = setTimeout(() =>{
            setDateMsg('')
            dispatch({type:CAR_RENT_EDIT_RESET})
        }, TIME_CLEAR_MSG)
        
        return () => clearTimeout(timeout)
    }, [dateMsg])


    return (
        <main>
            <Header />
            <FormContainer>
                {dateMsgSuccess &&<Message variant='success'>{dateMsgSuccess}</Message>}
                {dateMsg &&<Message variant='danger'>{dateMsg}</Message>}
                {loadingCarDetails || loadingCarRentDetails || loadingCarEditRent
                    ? (<Loader />)
                    : errorCarDetails || errorCarRentDetails || errorCarEditRent
                    ? (<Message variant='danger'>{msgError}</Message>)
                    :
                    <section>
                        <Row>
                            <Col>
                                <h3>{CAR_RENT_EDIT_TITLE}</h3>
                            </Col>
                            <Col className='btn-position'>
                                <LinkContainer to={`/mainpage/${locationId}/car-list`}>  
                                    <Button className='btn-md btn-back'>
                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {CAR_RESERVATION_BUTTON_BACK_TO_MENU}
                                    </Button>
                                </LinkContainer>

                                <LinkContainer to={`/car/${car.id}/show/${action}/${locationId}/id-rent/${rentId}`}>  
                                    <Button variant='info' className='btn-md m-1'>
                                        <FontAwesomeIcon icon={faCalendar} /> {CAR_RESERVATION_BUTTON_NAME}
                                    </Button>
                                </LinkContainer>                                  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Image src = {car.image} className='car-show-img-sizing'/>
                                <h4>{car.name}</h4>
                                <h5>{CAR_RENT_EDIT_NO_REGISTRATION_SUBTITLE} {car.code_registration}</h5>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <h4 className='general-info-subtitle'>{CAR_RENT_EDIT_GENERAL_INFO_SUBTITLE}</h4> 
                                {!lessGeneralInfo
                                    ?
                                    <Button 
                                        className = 'btn-show'
                                        onClick={showGeneralInfo}
                                    >
                                        <FontAwesomeIcon icon={faArrowCircleDown} /> {BTN_SHOW_MORE}
                                    </Button> 
                                    :
                                    <Button 
                                    className='btn-show'
                                    onClick={showGeneralInfo}
                                    >
                                    <FontAwesomeIcon icon={faArrowCircleUp} /> {BTN_WRAP_OUT}
                                    </Button>                                     
                                }

                            </Col>
                        </Row> 
                        {generalInfo
                            ?
                            <div>
                                <h5>{CAR_RENT_EDIT_CLIENT_NAME} {rent.client_name}</h5>
                                <h5>
                                {CAR_RENT_EDIT_DOC_TYPE} {rent.client_document_type} ,  
                                {rent.client_document_identification}
                                </h5>
                                <h5>{CAR_RENT_EDIT_PHONE} {rent.client_phone}</h5>
                                {rent.client_email
                                    ? <h5>{CAR_RENT_EDIT_EMAIL} {rent.client_email}</h5>
                                    : null
                                }
                                <h5>{CAR_RENT_EDIT_DATE_FROM}
                                    {rent.start_year}
                                    -{rent.start_month > 9 ? rent.start_month : `0${rent.start_month}`}
                                    -{rent.start_day > 9 ? rent.start_day : `0${rent.start_day}`} ,
                                    {rent.start_hour > 9 ? rent.start_hour : `0${rent.start_hour}`}
                                    :{rent.start_minute > 9 ? rent.start_minute : `0${rent.start_minute}`}
                                </h5>
                                <h5>{CAR_RENT_EDIT_DATE_TO}
                                {rent.end_year}
                                    -{rent.end_month > 9 ? rent.end_month : `0${rent.end_month}`}
                                    -{rent.end_day > 9 ? rent.end_day : `0${rent.end_day}`} , 
                                    {rent.end_hour > 9 ? rent.end_hour : `0${rent.end_hour}`}
                                    :{rent.end_minute > 9 ? rent.end_minute : `0${rent.end_minute}`}
                                </h5>
                            </div>
                            : null
                        }                     

                        <hr />
                        <Row>
                            <Col>
                                <h4 className='payment-info-subtitle'>{CAR_RENT_EDIT_PAYMENTS_INFO_TITLE}</h4>
                                {!lessPaymentlInfo
                                    ?
                                    <Button 
                                        className = 'btn-show' 
                                        onClick={showPaymentInfo}
                                    >
                                        <FontAwesomeIcon icon={faArrowCircleDown} /> {BTN_SHOW_MORE}
                                    </Button>
                                    :
                                    <Button 
                                        className='btn-show'
                                        onClick={showPaymentInfo}
                                    >
                                        <FontAwesomeIcon icon={faArrowCircleUp} /> {BTN_WRAP_OUT}
                                    </Button>                                 
                                }

                            </Col>
                        </Row>
                        {paymentInfo
                            ?
                            <div>
                                <h5>{CAR_RENT_EDIT_DEPOSIT} {rent.deposit} {rent.deposit_currency}</h5>
                                {!rent.total_price_is_paid 
                                ? <h5>{CAR_RENT_EDIT_TOTAL_PRICE} {rent.total_price} {rent.total_price_currency} ({CAR_RENT_EDIT_TOTAL_PRICE_UNPAID})</h5>
                                : <h5>{CAR_RENT_EDIT_TOTAL_PRICE} {rent.total_price} {rent.total_price_currency} ({CAR_RENT_EDIT_TOTAL_PRICE_PAID})</h5>
                                }
                            </div>
                            :null
                        }

                        <hr />
                        <Form onSubmit={handleSubmit(submitHandler)}>
                            <Form.Group controlId='datePicker' >
                                <Row >
                                    <Col md={4} xs={8}>
                                        <Form.Label className="mt-3">{CAR_RENT_EDIT_DATEPICKER_TO_TITLE}</Form.Label>
                                        <DatePicker 
                                            dateFormat="yyyy-MM-dd" 
                                            autoComplete='off'
                                            autocomplete="off"
                                            placeholderText={CAR_RENT_EDIT_DATE_DATEPICKER}
                                            selected={endDate}
                                            style={{ marginRight: "10px" }} 
                                            className='date-picker-style form-reservation'
                                            onChange={SubmitEndDate}
                                            name = 'dateTo'
                                            locale={language}
                                        />
                                        {endDateMsg ? <p className='docTypeMessage-style'>{endDateMsg}</p> : null}
                                    </Col>

                                    <Col md={2} xs={4}>
                                        <Form.Label className="mt-3">{CAR_RENT_EDIT_TIMEPICKER_TO_TITLE}</Form.Label>
                                        <TimePickerComponent
                                            id="timepicker" 
                                            placeholder="" 
                                            format = "HH:mm"
                                            value={endTimeValue}
                                            min = {TIME_MIN_VALUE}
                                            max = {TIME_MAX_VALUE}
                                            step={TIME_STEP}
                                            onChange = {SubmitEndTime}
                                        />
                                        {selectEndTimeMsg ? <p className='docTypeMessage-style'>{selectEndTimeMsg}</p> : null}
                                    </Col>

                                </Row>
                                {wrongBackDateMsg ? <p className='docTypeMessage-style'>{wrongBackDateMsg}</p> : null}
                            </Form.Group>
                            <Form.Group controlId='totalPrice'>
                                <Row>
                                    <Col md={4} xs={6}>
                                        <Form.Label className="mt-3">{CAR_RENT_EDIT_TOTAL_PRICE_TITLE}</Form.Label>
                                        <Form.Control
                                                type="number"
                                                name="totalPrice"
                                                {...register("totalPrice",                                               
                                                    {
                                                        pattern: {
                                                        value: /^[]?\d*(?:[,]\d*)?$/,
                                                        message: CAR_RENT_EDIT_INPROPER_TOTAL_PRICE,                               
                                                        },
                                                    }                                                  
                                                )
                                                }
                                                className='form-reservation'    
                                                onKeyUp={() => {trigger("totalPrice")}}                 
                                        >
                                        </Form.Control>
                                        {errors.totalPrice && (<div className='form-msg-style'>{errors.totalPrice.message}</div>)}
                                        {totalPriceMsg ? <p className='docTypeMessage-style'>{totalPriceMsg}</p> : null}
                                    </Col>
                                    <Col md={2} xs={4}>
                                        <Form.Label className="mt-3">{CAR_RENT_EDIT_TOTAL_PRICE_CURRENCY_TITLE}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="totalCurrency"
                                            {...register("totalCurrency")}
                                            className='form-reservation'
                                            disabled
                                        >
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId='localisation'>
                                <Row>
                                    {rent.id
                                        ?
                                        <h5 className='mt-3'>{CAR_RENT_EDIT_LOCATISATION_SUBTITLE} {rent.location.short_name}</h5>
                                        :null
                                    }
                                    <Col md={8} xs={8}>
                                        <Form.Label className="mt-3">{CAR_RENT_EDIT_LOCATION_TITLE}</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name = 'location'
                                            {...register("location")}                             
                                            onChange = {selectlocationHandler}
                                            className='form-reservation'
                                        >
                                            <option value={CAR_RENT_EDIT_OPTION_0} hidden></option>
                                            {locations.map(location => (
                                                <option key={location.id} value={location.id}>{location.short_name}</option>
                                            ))}
                                        </Form.Select>
                                        {location ? <p className='form-msg-style'>{location}</p> : null}
                                    </Col> 
                                </Row>
                            </Form.Group>

                            <Form.Group controlId='note'>
                                <Row>
                                <Col md={9} xs={12}>
                                    <Form.Label className="mt-3">{CAR_RENT_EDIT_NOTE_TITLE}</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="note"
                                        {...register("note")}
                                        className='form-reservation'
                                    >
                                    </Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button type='submit' variant='warning' className='rounded my-3'>
                                <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT} 
                            </Button>
                        </Form>
                    </section>
                }

            </FormContainer>
        </main>
    )
}

export default CarRentEdit