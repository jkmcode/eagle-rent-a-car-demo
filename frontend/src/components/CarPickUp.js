import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Form, Button, Row, Col ,Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from "react-hook-form";
import Loader from './Loader';
import Message from './Message';
import BackLogin from './BackToLogin';
import { scroller } from "react-scroll";

import { getRentDetailsByCarId, carUpdateRentbyId } from '../action/carsAction';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faArrowAltCircleLeft, 
        faArrowCircleDown,
        faAngleDoubleLeft,
        faArrowCircleUp
} from "@fortawesome/free-solid-svg-icons"

import { 
  CAR_PICK_UP_TITLE,
  CAR_PICK_UP_GENERAL_INFO_TITLE,
  CAR_PICK_UP_PAYMENTS_INFO_TITLE,
  CAR_PICK_UP_DEPOSIT_TITLE,
  CAR_PICK_UP_DEPOSIT_CURRENCY_TITLE,
  CAR_PICK_UP_DEPOSIT_IS_ACCOUNTED_TITLE,
  CAR_PICK_UP_TOTAL_PRICE_TITLE,
  CAR_PICK_UP_TOTAL_PRICE_CURRENCY_TITLE,
  CAR_PICK_UP_TOTAL_PRICE_IS_ACCOUNTED_TITLE,
  CAR_PICK_UP_NOTE_TITLE,

  CAR_PICK_UP_PAYMENTS_SUBTITLE,

  CAR_PICK_UP_CLIENT_NAME,
  CAR_PICK_UP_DOC_TYPE,
  CAR_PICK_UP_PHONE,
  CAR_PICK_UP_EMAIL,
  CAR_PICK_UP_DATE_FROM,
  CAR_PICK_UP_DATE_TO,
  CAR_PICK_UP_DEPOSIT,
  CAR_PICK_UP_TOTAL_PRICE,
  CAR_PICK_UP_TOTAL_PRICE_UNPAID,
  CAR_PICK_UP_TOTAL_PRICE_PAID,

  CAR_PICK_UP_ACCOUNTED_REQUIRED,
  CAR_PICK_UP_IS_ACCOUNTED_TOTAL_PRICE_REQUIRED,

  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  SUCCESS,
  SUCCESS_PICK_UP,
  CAR_PICK_UP_BUTTON_NAME,

  BTN_BACK,
  BTN_SHOW_MORE,
  BTN_WRAP_OUT,



  TIME_CLEAR_MSG,
} from '../constants/EnvConstans'

function CarPickUp() {

  const params = useParams()
  const carId = params.id
  const locationId = params.idLocation

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()

  const carRentDetails = useSelector(state => state.carRentDetails)
  const {loading, error, rent} = carRentDetails

  const carUpdateRent = useSelector(state => state.carUpdateRent)
  const {loading:carUpdateLoading, error:carUpdateError, rent:carUpdateRentMsg} = carUpdateRent

  //Form variables
  const [isAccounted, setIsAccounted] = useState(false)
  const [isAccountedMsg, setIsAccountedMsg] = useState('')
  const [isAccountedTotalPrice, setIsAccountedTotalPrice] = useState(false)
  const [isAccountedTotalPriceMsg, setIsAccountedTotalPriceMsg] = useState('')

  //variables related to show info 
  const [generalInfo, setGeneralInfo] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState(false)
  const [lessGeneralInfo, setLessGeneralInfo] = useState(false)
  const [lessPaymentlInfo, setLessPaymentInfo] = useState(false)

  //Error handling variables
  const [pickUpMsgSuccess, setPickUpMsgSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const submitHandler = (data) => {
    scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})

    if(!data.isAccounted){
        setIsAccountedMsg(CAR_PICK_UP_ACCOUNTED_REQUIRED)
    }

    if(!data.isAccountedTotalPrice){
        setIsAccountedTotalPriceMsg(CAR_PICK_UP_IS_ACCOUNTED_TOTAL_PRICE_REQUIRED)
    }

    if(isAccounted && isAccountedTotalPrice){
      dispatch(carUpdateRentbyId({
        id: rent.id,
      }))
    }
    
  }

  //function from FormCheck
  const submitHandlerDeposit = () => {
    if(isAccounted){
      setIsAccounted(false)
    }
    else{
      setIsAccounted(true)
    }
    
  }

  const submitHandlerTotalPrice = () => {
    if(isAccountedTotalPrice){
      setIsAccountedTotalPrice(false)
    }
    else{
      setIsAccountedTotalPrice(true)
    }
    
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

    //Success and error useEffect
    useEffect(() => {
        if(carUpdateRentMsg===SUCCESS){
            setPickUpMsgSuccess(SUCCESS_PICK_UP)     
            const timeout = setTimeout(() =>{
              navigate(`/mainpage/${locationId}/car-list`)
            }, TIME_CLEAR_MSG)
        }

        if(carUpdateError || error){
            if(carUpdateError===REQUEST_FAILED_WITH_STATUS_CODE_500 || error ===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setErrorMsg(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setErrorMsg(REQUEST_FAILED_REST_OF_STATUS_CODE)
            } 
        }
    }, [carUpdateRentMsg, carUpdateError, error])

    //Fetch carRentDetails from database
    useEffect(() => {
      scroller.scrollTo('navbar', {smooth: true, offset: -90,duration: 10,})
      if(!error){
        if(!rent.client_name || rent.id_cars.id != carId){
          dispatch(getRentDetailsByCarId(carId))
        }else{
          reset({
            deposit:rent.deposit, 
            depositCurrency: rent.deposit_currency,
            totalPrice: rent.total_price,
            totalCurrency: rent.total_price_currency,
            note: rent.note
          })
        }
      }
    }, [dispatch,rent])  

    //UseEffect - kasowanie komunikatów  
    useEffect(() => {
        
        const timeout = setTimeout(() =>{
          setPickUpMsgSuccess('')
        }, TIME_CLEAR_MSG)
        
        return () => clearTimeout(timeout)
    }, [pickUpMsgSuccess, errorMsg])

  return (
      <main>
          <BackLogin />
          <Header />
          <FormContainer>
            {pickUpMsgSuccess &&<Message variant='success'>{pickUpMsgSuccess}</Message>}
            {errorMsg &&<Message variant='danger'>{errorMsg}</Message>}
            {loading
              ? (<Loader/>)
              : error 
                ? null
                :
                (
                  <section>
                    {rent.client_name
                    ?
                      <div>
                        <Row>
                          <Col>
                            <h3>{CAR_PICK_UP_TITLE}</h3>
                            <Image src = {rent.id_cars.image} className='car-admin-img-sizing'/>
                            <h4>{rent.id_cars.name}</h4>
                            <h5>{rent.id_cars.code_registration}</h5>
                          </Col>
                          <Col className='btn-position'>
                            <LinkContainer to={`/mainpage/${locationId}/car-list/`}>  
                                <Button 
                                    className='btn-back m-1'
                                >
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                </Button>
                            </LinkContainer>                            
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <h4 className='general-info-subtitle'>{CAR_PICK_UP_GENERAL_INFO_TITLE}</h4>
                            {!lessGeneralInfo
                              ? 
                                <Button 
                                  className='btn-show'
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
                              <h5>{CAR_PICK_UP_CLIENT_NAME} {rent.client_name}</h5>
                              <h5>
                                {CAR_PICK_UP_DOC_TYPE} {rent.client_document_type} ,  
                                {rent.client_document_identification}
                              </h5>
                              <h5>{CAR_PICK_UP_PHONE} {rent.client_phone}</h5>
                              {rent.client_email
                                ? <h5>{CAR_PICK_UP_EMAIL} {rent.client_email}</h5>
                                :null
                              }
                              <h5>{CAR_PICK_UP_DATE_FROM}
                                  {rent.start_year}
                                  -{rent.start_month > 9 ? rent.start_month : `0${rent.start_month}`}
                                  -{rent.start_day > 9 ? rent.start_day : `0${rent.start_day}`} ,
                                  {rent.start_hour > 9 ? rent.start_hour : `0${rent.start_hour}`}
                                  :{rent.start_minute > 9 ? rent.start_minute : `0${rent.start_minute}`}
                              </h5>
                              <h5>{CAR_PICK_UP_DATE_TO}
                                {rent.end_year}
                                -{rent.end_month > 9 ? rent.end_month : `0${rent.end_month}`}
                                -{rent.end_day > 9 ? rent.end_day : `0${rent.end_day}`} ,
                                {rent.end_hour > 9 ? rent.end_hour : `0${rent.end_hour}`}
                                :{rent.end_minute > 9 ? rent.end_minute : `0${rent.end_minute}`}
                              </h5>   
                            </div> 
                            :null                      
                        }
                        <hr />
                        <Row>
                          <Col>
                            <h4 className='payment-info-subtitle'>{CAR_PICK_UP_PAYMENTS_INFO_TITLE}</h4>
                            {!lessPaymentlInfo
                              ? 
                                <Button 
                                  className='btn-show'
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
                              <h5>{CAR_PICK_UP_DEPOSIT} {rent.deposit} {rent.deposit_currency}</h5>
                              {!rent.total_price_is_paid 
                                ? <h5>{CAR_PICK_UP_TOTAL_PRICE} {rent.total_price} {rent.total_price_currency} ({CAR_PICK_UP_TOTAL_PRICE_UNPAID})</h5>
                                : <h5>{CAR_PICK_UP_TOTAL_PRICE} {rent.total_price} {rent.total_price_currency} ({CAR_PICK_UP_TOTAL_PRICE_PAID})</h5>
                              } 
                            </div>   
                          :null                    
                        }
                        

                        <hr />
                        <Form onSubmit={handleSubmit(submitHandler)}>
                          <Form.Group controlId='deposit'>
                              <h4>{CAR_PICK_UP_PAYMENTS_SUBTITLE}</h4>
                              <Row >
                                  <Col md={2} xs={4}>
                                      <Form.Label className="mt-3">{CAR_PICK_UP_DEPOSIT_TITLE}</Form.Label>
                                      <Form.Control
                                              type="text"
                                              name="deposit"
                                              {...register("deposit")}
                                              className='form-reservation'
                                              disabled
                                      >
                                      </Form.Control>
                                  </Col> 
                                  <Col md={2} xs={4}>
                                      <Form.Label className="mt-3">{CAR_PICK_UP_DEPOSIT_CURRENCY_TITLE}</Form.Label>
                                      <Form.Control
                                              type="text"
                                              name="depositCurrency"
                                              {...register("depositCurrency")}
                                              className='form-reservation'
                                              disabled
                                      >
                                      </Form.Control>
                                  </Col>
                                  <Col md={4} xs={4}>
                                    <Form.Label className="mt-3"></Form.Label>
                                    <Form.Group controlId='isPaid' className='mt-3'>
                                        <Form.Check
                                            type='checkbox'
                                            label = {CAR_PICK_UP_DEPOSIT_IS_ACCOUNTED_TITLE}
                                            onChange={submitHandlerDeposit}
                                            name = 'isPaid'
                                            className='form-reservation'
                                        >
                                        </Form.Check>
                                    </Form.Group> 
                                    {!isAccounted ? <p className='form-msg-style'>{isAccountedMsg}</p> : null} 
                                  </Col>
                              </Row>
                          </Form.Group>
                          <Form.Group controlId='totalPrice'>
                            <Row>
                              <Col md={2} xs={4}>
                                <Form.Label className="mt-3">{CAR_PICK_UP_TOTAL_PRICE_TITLE}</Form.Label>
                                  <Form.Control
                                          type="text"
                                          name="totalPrice"
                                          {...register("totalPrice")}  
                                          className='form-reservation'
                                          disabled                      
                                  >
                                  </Form.Control>
                              </Col>
                              <Col md={2} xs={4}>
                                <Form.Label className="mt-3">{CAR_PICK_UP_TOTAL_PRICE_CURRENCY_TITLE}</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="totalCurrency"
                                  {...register("totalCurrency")}
                                  className='form-reservation'
                                  disabled
                                >
                                </Form.Control>
                              </Col>
                                  <Col md={4} xs={4}>
                                    <Form.Label className="mt-3"></Form.Label>
                                    <Form.Group controlId='isTotalPricePaid' className='mt-3'>
                                        <Form.Check
                                            type='checkbox'
                                            label = {CAR_PICK_UP_TOTAL_PRICE_IS_ACCOUNTED_TITLE}
                                            onChange={submitHandlerTotalPrice}
                                            name = 'isTotalPricePaid'
                                            className='form-reservation'
                                        >
                                        </Form.Check>
                                    </Form.Group> 
                                    {!isAccountedTotalPrice ? <p className='form-msg-style'>{isAccountedTotalPriceMsg}</p> : null} 
                                </Col>
                            </Row>
                          </Form.Group>
                          <Form.Group controlId='totalPrice'>
                            <Row>
                              <Col md={9} xs={12}>
                                <Form.Label className="mt-3">{CAR_PICK_UP_NOTE_TITLE}</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  name="note"
                                  {...register("note")}
                                  className='form-reservation'
                                  disabled
                                >
                                </Form.Control>
                                  </Col>
                            </Row>
                          </Form.Group>


                        <Button 
                          type='submit' 
                          className='rounded btn-pickup my-3'
                        >
                          <FontAwesomeIcon icon={faArrowAltCircleLeft} /> {CAR_PICK_UP_BUTTON_NAME}
                        </Button>
                        </Form>
                        
                      </div>
                    : null
                  
                  }
                  </section>
                )
            }

          </FormContainer>
      </main>
  )
}
export default CarPickUp