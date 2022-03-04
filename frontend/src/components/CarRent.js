import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { Image, Form, Button , Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { LinkContainer } from 'react-router-bootstrap';
import { scroller } from "react-scroll";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";

import { createRent, getCarDetails, getCarSingleReservation } from '../action/carsAction';
import { getLocationDetails } from '../action/locationAction';
import { CAR_RENT_CREATE_RESET } from '../constants/CarsConstans';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faCar, 
        faCalendar, 
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"

import { 
    CAR_RENT_TITLE,
    CAR_RENT_NO_CUSTOMER_NAME,
    CAR_RENT_TO_FROM,

    CAR_RENT_CUSTOMER_NAME_TITLE,
    CAR_RENT_DUCUMENT_TYPE_TITLE,
    CAR_RENT_PHONE_NO_TITLE,
    CAR_RENT_DUCUMENT_NO_TITLE,
    CAR_RENT_EMAIL_TITLE,
    CAR_RENT_RENT_TO_TITLE,
    CAR_RENT_TIME_TITLE,
    CAR_RENT_DEPOSIT_TITLE,
    CAR_RENT_DEPOSIT_IS_PAID_TITLE,
    CAR_RENT_TOTAL_PRICE_TITLE,
    CAR_RENT_DEPOSIT_CURRENCY_TITLE,
    CAR_RENT_TOTAL_PRICE_IS_PAID_TITLE,
    CAR_RENT_NOTE_MSG_TITLE,
    CAR_RENT_LOCATION_TITLE,
    CAR_RENT_COME_BACK_TITLE,

    CAR_RENT_TAKE_BACK_SUBTITLE,
    CAR_RENT_GENERAL_INFO_SUBTITLE,
    CAR_RENT_PAYMENTS_SUBTITLE,
    CAR_RENT_NO_REGISTRATION_SUBTITLE,
    CAR_RENT_LOCATISATION_SUBTITLE,

    CAR_RENT_MIN_LENGTH_MSG,
    CAR_RENT_MIN_LENGTH_VALUE,
    CAR_RENT_REQUIRED_CLIENT_NAME,
    CAR_RENT_SELECT_FROM_THE_LIST,
    CAR_RENT_DOCUMENT_NO_REQUIRED,
    CAR_RENT_INPROPER_PHONE_NO,
    CAR_RENT_PHONE_NO_REQUIRED,
    CAR_RENT_MAX_LENGTH_MSG,
    CAR_RENT_MAX_LENGTH_VALUE,
    CAR_RENT_INPROPER_EMAIL,
    CAR_RENT_DATE_AND_TIME_REQUIRED,
    CAR_RENT_REQUIRED_DEPOSIT,
    CAR_RENT_IS_PAID_REQUIRED,
    CAR_RENT_INPROPER_DEPOSIT,
    CAR_RENT_INPROPER_TOTAL_PRICE,
    CAR_RENT_REQUIRED_TOTAL_PRICE,
    CAR_RENT_REQUIRED_LOCATION,

    CAR_RENT_OPTION_0,
    CAR_RENT_CREATE_MSG,

    CAR_RENT_ERROR_HANDLING_SUCCESS,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_3,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_4,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_5,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_6,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG,
    CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7_MSG,
    REQUEST_FAILED_WITH_STATUS_CODE_500,
    REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
    REQUEST_FAILED_REST_OF_STATUS_CODE,

    CAR_RESERVATION_BUTTON_NAME,

    OPTION_CCY,
    OPTION_DOC,
    TIME_STEP,
    TIME_DEFAULT_VALUE_START,
    TIME_DEFAULT_VALUE_END,
    TIME_MIN_VALUE,
    TIME_MAX_VALUE,
    SET_DATE_TIME_RESERVATION,
    SET_DATE_TIME_RESERVATION_MSG,
    MIN_DURATION,
    MIN_DURATION_RENT_MSG,
    TIME_CLEAR_MSG,
    TRANSFER_TIME,

    CAR_RENT_BUTTON_NAME,

} from '../constants/EnvConstans'

function CarRent() {

  const dispatch = useDispatch()
  const params = useParams()
  const carId = params.id
  const locationId = params.idLocation
  const actionResToRent = params.action
  const resId = params.idRes

  const navigate = useNavigate()

  //Fetch data from Redux
  const locationList = useSelector(state => state.locationList)
  const { locations } = locationList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const carRentCreate = useSelector(state => state.carRentCreate)
  const { loading, rent, error } = carRentCreate 

  const carDetails = useSelector(state => state.carDetails)
  const {car} = carDetails

  const locationDetails = useSelector(state => state.locationDetails)
  const {errorDetailsFail, location:locationInfo} = locationDetails

  const carSingleReservation = useSelector(state => state.carSingleReservation)
  const { loading: loadingSingleReservation, reservation, error: errorSingleReservation } = carSingleReservation  

  //Form variables
  const [clientNameMsg, setClientNameMsg] = useState('')
  const [docTypeMessage, setDocTypeMessage] = useState('')
  const [nrDocMsg, setNrDocMsg] = useState('')
  const [phoneNrMsg, setPhoneNrMsg] = useState('')
  const [isPaid, setIsPaid] = useState(false)
  const [isPaidMsg, setIsPaidMsg] = useState('')
  const [depositCurrency, setDepositCurrency] = useState('')
  const [depositMsg, setDepositMsg] = useState('')
  const [totalPriceMsg, setTotalPrice] = useState('')
  const [totalPriceCurrency, setTotalPriceCurrency] = useState('')
  const [isPaidTotalPrice, setIsPaidTotalPrice] = useState(false)
  const [comeBack, setComeBack] = useState(false)
  const [location, setLocation] = useState('')
  const [resToRent, setResToRent] = useState('')

  //Date and Time variables
  const [newEvent, setNewEvent] = useState({start:"", end:""})
  const [startDateMsg, setStartDateMsg] = useState('')
  const [wrongBackDateMsg, setWrongBackDateMsg] = useState('')
  const [selectStartTimeMsg, setSelectStartTimeMsg] = useState('')
  const [selectEndTimeMsg, setSelectEndTimeMsg] = useState('')
  const [getStartTimeHoursAndMinutes, setStartTimeGetHoursAndMinutes] = useState(new Date(`01/02/2021 10:00`))
  const [getEndTimeHoursAndMinutes, setEndTimeGetHoursAndMinutes] = useState('')
  const [endDateMsg, setEndDateMsg] = useState('')
  const [endTimeValue,setEndTimeValue] = useState('')
  const [resDate, setRestDate] = useState('')

  //Error handling variables
  const [dateMsgSuccess, setDateMsgSuccess] = useState('')
  const [dateMsg, setDateMsg] = useState('')
  const [dateMsgError, setDateMsgError] = useState('')

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    registerLocale("pl", pl);

    const [language, setLanguage] = useState("pl")

  const submitHandler = (data) => {
    scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})

    let endDateTimeCombiner = newEvent.end

    if(data.name){
        setClientNameMsg('')
    }else{
      setClientNameMsg(CAR_RENT_REQUIRED_CLIENT_NAME)
    }

    if(data.documentType === CAR_RENT_OPTION_0){
        setDocTypeMessage(CAR_RENT_SELECT_FROM_THE_LIST)
    }

    if(data.IdNumber){
        setNrDocMsg('')
    }else{
        setNrDocMsg(CAR_RENT_DOCUMENT_NO_REQUIRED)
    }

    if(data.phone){
        setPhoneNrMsg('')
    }else{
        setPhoneNrMsg(CAR_RENT_PHONE_NO_REQUIRED)
    }

    if(getEndTimeHoursAndMinutes){
      if(endDateTimeCombiner){
          endDateTimeCombiner.setHours(getEndTimeHoursAndMinutes.getHours())
          endDateTimeCombiner.setMinutes(getEndTimeHoursAndMinutes.getMinutes())
      }
      }else {
        setSelectEndTimeMsg(CAR_RENT_DATE_AND_TIME_REQUIRED)
    }

    if(!endDateTimeCombiner){
        setEndDateMsg(CAR_RENT_DATE_AND_TIME_REQUIRED)
    } else if((endDateTimeCombiner.valueOf() - MIN_DURATION) < new Date().valueOf()) {
        setWrongBackDateMsg(MIN_DURATION_RENT_MSG)
    }

    if(data.deposit){
        setDepositMsg('')
    }else{
      setDepositMsg(CAR_RENT_REQUIRED_DEPOSIT)
    }

    if(data.depositCurrency === CAR_RENT_OPTION_0){
        setDepositCurrency(CAR_RENT_SELECT_FROM_THE_LIST)
    }

    if(!data.isPaid){
        setIsPaidMsg(CAR_RENT_IS_PAID_REQUIRED)
    }

    if(data.totalPrice){
        setTotalPrice('')
    }else{
      setTotalPrice(CAR_RENT_REQUIRED_TOTAL_PRICE)
    }

    if(data.totalCurrency === CAR_RENT_OPTION_0){
        setTotalPriceCurrency(CAR_RENT_SELECT_FROM_THE_LIST)
    }

    if(data.location === CAR_RENT_OPTION_0){
        setLocation(CAR_RENT_REQUIRED_LOCATION)
    }


    if( 
        data.name
        && (data.documentType !== CAR_RENT_OPTION_0)
        && data.IdNumber
        && data.phone
        && getEndTimeHoursAndMinutes
        && endDateTimeCombiner
        && (endDateTimeCombiner > (new Date().valueOf() + SET_DATE_TIME_RESERVATION))
        && (data.deposit)
        && (data.depositCurrency !== CAR_RENT_OPTION_0)
        && (isPaid)
        && (data.totalPrice)
        && (data.totalCurrency !== CAR_RENT_OPTION_0)
        && (data.location !== CAR_RENT_OPTION_0)
    )    
    {

        const endYear = endDateTimeCombiner.getFullYear()
        const endMonth = (endDateTimeCombiner.getMonth() +1 )
        const endDay = endDateTimeCombiner.getDate()
        const endHours = endDateTimeCombiner.getHours()
        const endMinutes = endDateTimeCombiner.getMinutes()

        dispatch(createRent({
            id_car: carId,
            id_res: resId,
            client_name: data.name,
            client_document_type: data.documentType,
            client_document_identification: data.IdNumber,
            client_phone: data.phone,
            client_email: data.email,
            date_to: `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`,
            deposit: data.deposit,
            deposit_currency: data.depositCurrency,
            deposit_is_active: isPaid,
            total_price: data.totalPrice,
            total_price_currency: data.totalCurrency,
            total_price_is_paid: isPaidTotalPrice,
            come_back: comeBack,
            creator: userInfo.id,
            location: data.location,
            note: data.note,
            setCarRent: SET_DATE_TIME_RESERVATION,
            transferTime: TRANSFER_TIME,
            resToRent: resToRent
        }))
    }

  }

  //function from FormSelect
  const selectHandler = () => {
    setDocTypeMessage('')
  }

  const selectCurrencyHandler = () => {
    setDepositCurrency('')
  }

  const selectTotalCurrencyHandler = () => {
    setTotalPriceCurrency('')
  }

  const selectlocationHandler = () => {
    setLocation('')
  }

  

  //function from FormCheck
  const submitHandlerDeposit = () => {
    if(isPaid){
        setIsPaid(false)
    }
    if(!isPaid){
        setIsPaid(true)
    }
  }
  

  //DateTime function

    const SubmitEndDate = (end) => {
        setNewEvent({ ...newEvent, end })
        setEndDateMsg('')
        setWrongBackDateMsg('')
    }

    const SubmitEndTime = (time) => {
        let getTime = time.nativeEvent.text
        setEndTimeGetHoursAndMinutes(getTime)
        setSelectEndTimeMsg('')
        setWrongBackDateMsg('')
    }


    //Set default End Time 
    useEffect(() =>{
        scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})
        if(!actionResToRent){
            if(!getEndTimeHoursAndMinutes){
                setEndTimeValue(new Date(TIME_DEFAULT_VALUE_END))
                setEndTimeGetHoursAndMinutes(endTimeValue)
            }
        }
    }, [endTimeValue])     

    //Fetching data from database: carDetails, LocationDetails, CarSingleReservation 
    //Set End Time from database
    useEffect(() => {
      if(!car.name || car.id != carId){
        dispatch(getCarDetails(carId))
      }

      if(!errorDetailsFail){
        if(!locationInfo.name || locationInfo.id !== Number(locationId)){
            dispatch(getLocationDetails(locationId))
        }
      }

      if(actionResToRent){
          setResToRent('resToRent')
          if(!errorSingleReservation){
            if(!reservation.client_name || reservation.id !== Number(resId)){
                dispatch(getCarSingleReservation(resId))
            }else{
                reset({
                    name:reservation.client_name,
                    documentType: reservation.client_document_type,
                    IdNumber: reservation.client_document_identification,
                    phone: reservation.client_phone,
                    email: reservation.client_email,
                    note: reservation.note,
                })    
                
                setNewEvent({ ...newEvent, 
                    end: new Date(`${reservation.end_year}-${reservation.end_month}-${reservation.end_day}`)
                 })
                
                if(!getEndTimeHoursAndMinutes){
                    setEndTimeValue(new Date(`01/02/2021 ${reservation.end_hour}:${reservation.end_minute}`))
                    setEndTimeGetHoursAndMinutes(endTimeValue)
                }
            }
          }

      }
    }, [dispatch, car, carId, resId, errorDetailsFail, locationId, locationInfo, reservation, endTimeValue,]) 


    //Error handling and success related to date of range
    useEffect(() => {
        if(rent === CAR_RENT_ERROR_HANDLING_SUCCESS){
            dispatch({type:CAR_RENT_CREATE_RESET})
            setDateMsgSuccess(CAR_RENT_CREATE_MSG)
            const timeout = setTimeout(() =>{
                navigate(`/mainpage/${locationId}/car-list`)
            }, TIME_CLEAR_MSG) 
        } 

        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG)
        } 
        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG)
        }
        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_3){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG)
        }

        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_4){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG)
        } 
        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_5){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG)
        }
        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_6){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG)
        }
        if(rent===CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7){
            setDateMsg(CAR_RENT_ERROR_HANDLING_EXIST_RANGE_DATE_EX_7_MSG)
        }
    }, [rent])

    //Error handling related to database connection
    useEffect(() => {
        if(error){
            if(error===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setDateMsgError(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setDateMsgError(REQUEST_FAILED_REST_OF_STATUS_CODE)
            } 
        }
        
    }, [error])    

    //Error handling remove content 
    useEffect(() => {
        const timeout = setTimeout(() =>{
            setDateMsgSuccess('')
            setDateMsg('')
            setDateMsgError('')
            dispatch({type:CAR_RENT_CREATE_RESET})
        }, TIME_CLEAR_MSG)
        
        return () => clearTimeout(timeout)
    }, [dateMsgSuccess, dateMsg])

  return (
      <main>
          <Header />
          <FormContainer>
            {dateMsgSuccess &&<Message variant='success'>{dateMsgSuccess}</Message>}
            {dateMsg &&<Message variant='danger'>{dateMsg}</Message>}
            {dateMsgError &&<Message variant='danger'>{dateMsgError}</Message>}
            {actionResToRent
                ? <h3>Wynajem auta z rezerwacji</h3> : <h3>{CAR_RENT_TITLE}</h3>
            }
            
                <Row>
                    <Col>
                        <Image src = {car.image} className='car-show-img-sizing'/>
                        <h4>{car.name}</h4>
                        <h5>{CAR_RENT_NO_REGISTRATION_SUBTITLE} {car.code_registration}</h5>
                    </Col>

                    <Col className='btn-position'>
                        <LinkContainer to={`/mainpage/${locationId}/car-list/`}>  
                            <Button 
                                variant='warning' 
                                className='btn-back m-1'
                            >
                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                            </Button>
                        </LinkContainer>
                        {actionResToRent
                            ? 
                            <LinkContainer to={`/car/${car.id}/show/${actionResToRent}/${resId}/${locationId}`}> 
                                <Button variant='info' className='btn-md'>
                                    <FontAwesomeIcon icon={faCalendar} /> {CAR_RESERVATION_BUTTON_NAME} 
                                </Button>
                            </LinkContainer>
                            :
                            <LinkContainer to={`/car/${car.id}/show/rent/${locationId}`}> 
                                <Button variant='info' className='btn-md'>
                                    <FontAwesomeIcon icon={faCalendar} /> {CAR_RESERVATION_BUTTON_NAME} 
                                </Button>
                            </LinkContainer>
                        }
                    </Col>
                </Row>
                <hr/>
                <h4>{CAR_RENT_GENERAL_INFO_SUBTITLE}</h4>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Form.Group controlId='name'>
                        <Form.Label>{CAR_RENT_CUSTOMER_NAME_TITLE}</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder = {CAR_RENT_NO_CUSTOMER_NAME}
                            className='form-reservation'
                            {...register("name", 
                                {
                                    minLength: {
                                        value: CAR_RENT_MIN_LENGTH_VALUE,
                                        message: CAR_RENT_MIN_LENGTH_MSG,
                                    },
                                }                                  
                                )}
                                    onKeyUp={() => {trigger("name")}}
                                    name = 'name'
                                >
                        </Form.Control>
                            {clientNameMsg ? <p className='message-style'>{clientNameMsg}</p> : null}
                            {errors.name && (<div className='form-msg-style'>{errors.name.message}</div>)}
                    </Form.Group>

                    <Form.Group controlId='idDoc' >
                        <Row >                                  
                           <Col md={6} xs={12}>
                                <Form.Label className="mt-3">{CAR_RENT_DUCUMENT_TYPE_TITLE}</Form.Label>
                                <Form.Select 
                                    aria-label="Default select example"
                                    name = 'documentType'
                                    aria-label="Default select example"
                                    {...register("documentType", 
                                        {
                                            required: 'Pole wymagane',
                                        }                               
                                    )}
                                    onChange = {selectHandler}
                                    className='form-reservation'
                                >
                                    <option value={CAR_RENT_OPTION_0} hidden></option>
                                    {OPTION_DOC.map(doc => (
                                        <option key={doc}>{doc}</option>
                                    ))}                                    
                                </Form.Select>

                                {docTypeMessage ? <p className='form-msg-style'>{docTypeMessage}</p> : null}
                            </Col>

                            <Col md={6} xs={12}>
                                <Form.Label className="mt-3">{CAR_RENT_DUCUMENT_NO_TITLE}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-reservation'
                                        {...register("IdNumber")}                               
                                        name = 'IdNumber'
                                    >
                                </Form.Control>
                                {nrDocMsg ? <p className='form-msg-style'>{nrDocMsg}</p> : null}
                            </Col>
                        </Row>
                    </Form.Group> 

                    <Form.Group controlId='idPhoneEmail' >
                        <Row >                                  
                            <Col md={6} xs={12}>
                                <Form.Label className="mt-3">{CAR_RENT_PHONE_NO_TITLE}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-reservation'
                                        {...register("phone",
                                            {
                                            pattern: {
                                                value: /^[+-]?\d*(?:[.,]\d*)?$/,
                                                message: CAR_RENT_INPROPER_PHONE_NO,                               
                                            }, 

                                            maxLength: {
                                                value: CAR_RENT_MAX_LENGTH_VALUE,
                                                message: CAR_RENT_MAX_LENGTH_MSG,
                                            }, 

                                            }
                                        
                                        )}  
                                        onKeyUp={() => {trigger("phone")}}
                                        name = 'phone'
                                    >
                                </Form.Control>
                                {errors.phone && (<div className='form-msg-style'>{errors.phone.message}</div>)}
                                {phoneNrMsg ? <p className='docTypeMessage-style'>{phoneNrMsg}</p> : null}
                            </Col>

                            <Col md={6} xs={12}>
                                <Form.Label className="mt-3">{CAR_RENT_EMAIL_TITLE}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='form-reservation'
                                        {...register("email", 
                                            {
                                            pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: CAR_RENT_INPROPER_EMAIL,                                
                                    
                                        }})}
                                        onKeyUp={() => {trigger("email")}}
                                        name = 'email'
                                    >
                                </Form.Control>
                                {errors.email && (<div className='form-msg-style'>{errors.email.message}</div>)}
                            </Col>
                        </Row>
                    </Form.Group> 

                    <Form.Group controlId='datePicker'>
                        <Row >
                            <Col md={4} xs={8}>
                                <Form.Label className="mt-3">{CAR_RENT_RENT_TO_TITLE}</Form.Label>
                                <DatePicker 
                                    dateFormat="yyyy-MM-dd" 
                                    autoComplete='off'
                                    autocomplete="off"
                                    placeholderText={CAR_RENT_TO_FROM}
                                    //selected={actionResToRent ? resDate : null}
                                    selected={newEvent.end}
                                    style={{ marginRight: "10px" }} 
                                    className='date-picker-style form-reservation'
                                    onChange={SubmitEndDate}
                                    name = 'dateTo'
                                    locale={language}
                                    //disabled
                                />
                                {endDateMsg ? <p className='docTypeMessage-style'>{endDateMsg}</p> : null}
                            </Col>
                
                            <Col md={2} xs={4}>
                                <Form.Label className="mt-3">{CAR_RENT_TIME_TITLE}</Form.Label>
                                <TimePickerComponent
                                    id="timepicker" 
                                    placeholder="" 
                                    format = "HH:mm"
                                    value={actionResToRent ? endTimeValue : TIME_DEFAULT_VALUE_END}
                                    min = {TIME_MIN_VALUE}
                                    max = {TIME_MAX_VALUE}
                                    step={TIME_STEP}
                                    onChange = {SubmitEndTime}
                                    //disabled
                                />
                                {selectEndTimeMsg ? <p className='docTypeMessage-style'>{selectEndTimeMsg}</p> : null}
                            </Col>
                            {wrongBackDateMsg ? <p className='docTypeMessage-style'>{wrongBackDateMsg}</p> : null}
                        </Row>
                    </Form.Group>
                    <Form.Group controlId='deposit'>
                        <hr />
                        <h4>{CAR_RENT_PAYMENTS_SUBTITLE}</h4>
                        <Row >
                            <Col md={4} xs={4}>
                                <Form.Label className="mt-3">{CAR_RENT_DEPOSIT_TITLE}</Form.Label>
                                <Form.Control
                                        type="text"
                                        name="deposit"
                                        className='form-reservation'
                                        {...register("deposit", 
                                            {
                                            pattern: {
                                            value: /^\d{1,}(\.\d{0,2})?$/,
                                            message: CAR_RENT_INPROPER_DEPOSIT,                                
                                    
                                        }})}
                                        onKeyUp={() => {trigger("deposit")}}
                                >
                                </Form.Control>
                                {depositMsg ? <p className='form-msg-style'>{depositMsg}</p> : null}
                                {errors.deposit && (<div className='form-msg-style'>{errors.deposit.message}</div>)}
                            </Col>  
                            <Col md={2} xs={4}>
                                <Form.Label className="mt-3">{CAR_RENT_DEPOSIT_CURRENCY_TITLE}</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name = 'depositCurrency'
                                    aria-label="Default select example"
                                    {...register("depositCurrency")}                             
                                    onChange = {selectCurrencyHandler}
                                    className='form-reservation'
                                >
                                    <option value={CAR_RENT_OPTION_0} hidden></option>
                                    {OPTION_CCY.map(ccy => (
                                        <option key={ccy}>{ccy}</option>
                                    ))}
                                </Form.Select>
                                {depositCurrency ? <p className='form-msg-style'>{depositCurrency}</p> : null}
                            </Col> 
                            <Col md={3} xs={2}>
                                <Form.Label className="mt-3"></Form.Label>
                                <Form.Group controlId='isPaid' className='mt-3'>
                                    <Form.Check
                                        type='checkbox'
                                        label = {CAR_RENT_DEPOSIT_IS_PAID_TITLE}
                                        onChange={submitHandlerDeposit}
                                        name = 'isPaid'
                                        className='form-reservation'
                                    >
                                    </Form.Check>
                                </Form.Group> 
                                {!isPaid ? <p className='form-msg-style'>{isPaidMsg}</p> : null}                               
                            </Col>           
                        </Row>
                    </Form.Group>
                    <Form.Group controlId='totalPrice'>
                        <Row >
                            <Col md={4} xs={4}>
                                <Form.Label className="mt-3">{CAR_RENT_TOTAL_PRICE_TITLE}</Form.Label>
                                <Form.Control
                                        type="text"
                                        name="totalPrice"
                                        className='form-reservation'
                                        {...register("totalPrice", 
                                            {
                                            pattern: {
                                            value: /^\d{1,}(\.\d{0,2})?$/,
                                            message: CAR_RENT_INPROPER_TOTAL_PRICE,                                
                                    
                                        }})}
                                        onKeyUp={() => {trigger("totalPrice")}}
                                >
                                </Form.Control>
                                {totalPriceMsg ? <p className='form-msg-style'>{totalPriceMsg}</p> : null}
                                {errors.totalPrice && (<div className='form-msg-style'>{errors.totalPrice.message}</div>)}
                            </Col>  
                            <Col md={2} xs={4}>
                                <Form.Label className="mt-3">{CAR_RENT_DEPOSIT_CURRENCY_TITLE}</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name = 'totalCurrency'
                                    aria-label="Default select example"
                                    {...register("totalCurrency")}                             
                                    onChange = {selectTotalCurrencyHandler}
                                    className='form-reservation'
                                >
                                    <option value={CAR_RENT_OPTION_0} hidden></option>
                                    {OPTION_CCY.map(ccy => (
                                        <option key={ccy}>{ccy}</option>
                                    ))}
                                </Form.Select>
                                {totalPriceCurrency ? <p className='form-msg-style'>{totalPriceCurrency}</p> : null}
                            </Col> 
                            <Col md={3} xs={2}>
                                <Form.Label className="mt-3"></Form.Label>
                                <Form.Group controlId='isPaidTotalPrice' className='mt-3'>
                                    <Form.Check
                                        type='checkbox'
                                        label = {CAR_RENT_TOTAL_PRICE_IS_PAID_TITLE}
                                        onChange={(e) => setIsPaidTotalPrice(e.target.checked)}
                                        name = 'isPaidTotalPrice'
                                        className='form-reservation'
                                    >
                                    </Form.Check>
                                </Form.Group>                               
                            </Col>           
                        </Row>
                    </Form.Group>
                    <Form.Group controlId='takeBack'>
                        <hr />
                        <h4>{CAR_RENT_TAKE_BACK_SUBTITLE}</h4>
                        <Row>
                            <Col md={8} xs={8}>
                                <h5>{CAR_RENT_LOCATISATION_SUBTITLE} {locationInfo.short_name}</h5>
                                <Form.Label className="mt-3">{CAR_RENT_LOCATION_TITLE}</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name = 'location'
                                    aria-label="Default select example"
                                    {...register("location")}                             
                                    onChange = {selectlocationHandler}
                                    className='form-reservation'
                                >
                                    <option value={CAR_RENT_OPTION_0} hidden></option>
                                    {locations.map(location => (
                                        <option key={location.id} value={location.id}>{location.short_name}</option>
                                    ))}
                                </Form.Select>
                                {location ? <p className='form-msg-style'>{location}</p> : null}
                            </Col> 
                            {/* <Col md={4} xs={2}>
                                <Form.Label className="mt-3"></Form.Label>
                                <Form.Group controlId='isComeBack' className='mt-3'>
                                    <Form.Check
                                        type='checkbox'
                                        label = {CAR_RENT_COME_BACK_TITLE}
                                        onChange={(e) => setComeBack(e.target.checked)}
                                        name = 'isComeBack'
                                        className='form-reservation'
                                    >
                                    </Form.Check>
                                </Form.Group>                               
                            </Col>            */}
                        </Row>
                        <Row >
                            <Col md={12}>
                                <Form.Label className="mt-3">{CAR_RENT_NOTE_MSG_TITLE}</Form.Label>
                                <Form.Control
                                        type="text"
                                        name="note"
                                        className='form-rent-msg'
                                        {...register("note")}
                                >
                                </Form.Control>
                            </Col>  
                        </Row>
                    </Form.Group>
                    <Button 
                        type='submit' 
                        variant='info' 
                        className='rounded my-3'
                    >
                        <FontAwesomeIcon icon={faCar} /> {CAR_RENT_BUTTON_NAME} 
                    </Button>
                </Form>
          </FormContainer>
      </main>
  )
}
export default CarRent