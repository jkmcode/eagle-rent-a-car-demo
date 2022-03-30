import React,{ useState, useEffect } from 'react'
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import BackLogin from './BackToLogin';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCar, createCarUploadImage } from '../action/carsAction';
import { CARS_DETAILS_RESET,
         CARS_CREATE_RESET,
         CARS_CREATE_UPLOAD_IMAGE_RESET } from '../constants/CarsConstans';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

import {
    CARS_CREATE_TITLE,
    CARS_CREATE_CAR_NAME_TITLE,
    CARS_CREATE_CAR_SHORT_NAME_TITLE,
    CARS_CREATE_CAR_REGISTRATION_NO_TITLE,
    CARS_CREATE_CAR_MAIN_LOCATION_TITLE,
    CARS_CREATE_CHOOSE_PICTURE,

    CARS_CREATE_CAR_NAME_PLACEHOLDER,
    CARS_CREATE_CAR_SHORT_NAME_PLACEHOLDER,
    CARS_CREATE_CAR_REGISTRATION_NO_PLACEHOLDER,

    CARS_CREATE_CAR_NAME_REQUIRED,
    CARS_CREATE_CAR_NAME_MIN_LENGTH,

    CARS_CREATE_CAR_SHORT_NAME_REQUIRED,
    CARS_CREATE_CAR_SHORT_NAME_MIN_LENGTH,

    CARS_CREATE_CAR_REGISTRATION_NO_REQUIRED,
    CARS_CREATE_CAR_REGISTRATION_MIN_LENGTH,

    CARS_CREATE_CAR_MAIN_LOCATION_REQUIRED,
    OPTION_0,

    REQUEST_FAILED_WITH_STATUS_CODE_500,
    REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
    REGISTRATION_NO_ALREADY_EXIST,
    REQUEST_FAILED_REST_OF_STATUS_CODE,
    ERROR_UPLOAD_PICTURE,
    SUCCESS_CAR_ADD,

    BTN_BACK,
    BTN_SAVE
} from '../constants/EnvConstans'


function CarsCreate() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selects, setSelects] = useState('')
    const [ulopadImage, setUploadImage] = useState('')
    const [carCodeRegistration, setCarCodeRegistration] = useState('')
    const [flag, setFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorMessageImage, setErrorMessageImage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [locatisationMessage, setLocatisationMessage] = useState('')

    const [carName, setCarName] = useState('')
    const [carShortName, setCarShortName] = useState('')
    const [codeRegistration, setCodeRegistration] = useState('')

    const locationList = useSelector(state => state.locationList)
    const { locations } = locationList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const carCreate = useSelector(state => state.carCreate)
    const { error, loading, success } = carCreate

    const carCreateUploadImage = useSelector(state => state.carCreateUploadImage)
    const { error: errorUploadImage, loading: loadingUploadImage } = carCreateUploadImage

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    const onSubmit = async (data, e) =>  {


        if(data.selectLocation === OPTION_0){
            setLocatisationMessage(CARS_CREATE_CAR_MAIN_LOCATION_REQUIRED)
        } 
        
        if(!data.name){
            setCarName(CARS_CREATE_CAR_NAME_REQUIRED)
        }else{
           setCarName('') 
        }
        
        if(!data.shortName){
            setCarShortName(CARS_CREATE_CAR_SHORT_NAME_REQUIRED)
        }else{
            setCarShortName('')
        }
        
        if(!data.codeRegistration){
            setCodeRegistration(CARS_CREATE_CAR_REGISTRATION_NO_REQUIRED)
        }else{
            setCodeRegistration('')
        }
        
        if(data.selectLocation !== OPTION_0
           && data.name
           && data.shortName
           && data.codeRegistration
        )
        {
            dispatch(createCar({
                'creator': userInfo._id,
                'name': data.name,
                'shortName': data.shortName,
                'codeRegistration': data.codeRegistration,
                'location': data.selectLocation,
                'image': selects
            }))

            setFlag(true)
            setCarCodeRegistration(data.codeRegistration)
        }
    }

    const selectHandler = () => {
        setLocatisationMessage('')
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setUploadImage(file)
        setSelects(file)
    }

    const onSubmitExecute = async () =>  {
        const formData = new FormData()

        formData.append('image', ulopadImage)
        formData.append('codeRegistration', carCodeRegistration)

        dispatch(createCarUploadImage(formData))
    }

    //główny UseEffect
    useEffect(() => {
        if(flag){
            if(!loading){
                if(!error && ulopadImage){
                    dispatch(onSubmitExecute)
                }
            } 
        }

    }, [flag, loading])

    //UseEffect - kasowanie komunikatów o błędzie   
    useEffect(() => {
        const timeout = setTimeout(() =>{
            if(error){           
                dispatch({type:CARS_CREATE_RESET})
                setFlag(false)
            }

            if(errorUploadImage){
                dispatch({type:CARS_CREATE_UPLOAD_IMAGE_RESET})  
                dispatch({type:CARS_DETAILS_RESET})
                navigate('/admin/cars')          
            }

            if(successMessage){
                dispatch({type:CARS_CREATE_RESET})
                dispatch({type:CARS_CREATE_UPLOAD_IMAGE_RESET}) 
                dispatch({type:CARS_DETAILS_RESET})
                navigate('/admin/cars')
            }
        }, 7500)
        
        return () => clearTimeout(timeout)
    }, [errorMessage, errorMessageImage, successMessage])

    //UseEffect -słownik błędów
    useEffect(() => {
        if(error){
            if(error===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else if (error===REGISTRATION_NO_ALREADY_EXIST){
                setErrorMessage(error)
            }else{
                setErrorMessage(REQUEST_FAILED_REST_OF_STATUS_CODE)
            }   
        }

        if(errorUploadImage){
            setErrorMessageImage(ERROR_UPLOAD_PICTURE)
        }
  
    }, [error, errorUploadImage])

    //UseEffect - komunikat success
    useEffect(() => {
        if(success){
            setSuccessMessage(SUCCESS_CAR_ADD)
        }
    }, [success])

    return (
        <main>
            <BackLogin />
            <Header />
            <FormContainer>
               {success &&<Message variant='success'>{successMessage}</Message>}
               {error &&<Message variant='danger'>{errorMessage}</Message>}
               {errorUploadImage &&<Message variant='info'>{errorMessageImage}</Message>}
                <Row>
                    <Col>
                        <h2>{CARS_CREATE_TITLE}</h2>
                    </Col>
                    <Col className='btn-position'>
                        <LinkContainer to={`/admin/cars`}>  
                            <Button className='btn-md btn-back'>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                            </Button>
                        </LinkContainer>                    
                    </Col>
                </Row>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId='name'>
                                    <Form.Label>{CARS_CREATE_CAR_NAME_TITLE}</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder = {CARS_CREATE_CAR_NAME_PLACEHOLDER}
                                        {...register("name", 
                                            {
                                                minLength: {
                                                    value: 10,
                                                    message: CARS_CREATE_CAR_NAME_MIN_LENGTH,
                                                },
                                            }                               
                                        )}
                                        onKeyUp={() => {trigger("name")}}
                                        name = 'name'
                                    >
                                    </Form.Control>
                                    {errors.name && (<div className='form-msg-style'>{errors.name.message}</div>)}
                                    {carName ? <p className='docTypeMessage-style'>{carName}</p> : null}
                                </Form.Group>

                                <Form.Group controlId='shortName'>
                                    <Form.Label>{CARS_CREATE_CAR_SHORT_NAME_TITLE}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder = {CARS_CREATE_CAR_SHORT_NAME_PLACEHOLDER}
                                            {...register("shortName", 
                                            {
                                                minLength: {
                                                    value: 2,
                                                    message: CARS_CREATE_CAR_SHORT_NAME_MIN_LENGTH,
                                                }
                                            }                               
                                        )}
                                            onKeyUp={() => {trigger("shortName")}}
                                            name = 'shortName'
                                        >
                                        </Form.Control>
                                        {errors.shortName && (<div className='form-msg-style'>{errors.shortName.message}</div>)}
                                        {carShortName ? <p className='docTypeMessage-style'>{carShortName}</p> : null}
                                </Form.Group> 

                                <Form.Group controlId='codeRegistration'>
                                    <Form.Label>{CARS_CREATE_CAR_REGISTRATION_NO_TITLE}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder = {CARS_CREATE_CAR_REGISTRATION_NO_PLACEHOLDER}
                                            {...register("codeRegistration", 
                                            {
                                                minLength: {
                                                    value: 6,
                                                    message: CARS_CREATE_CAR_REGISTRATION_MIN_LENGTH,
                                                },
                                            }                               
                                        )}
                                            onKeyUp={() => {trigger("codeRegistration")}}
                                            name = 'codeRegistration'
                                        >
                                        </Form.Control>
                                        {errors.codeRegistration && (<div className='form-msg-style'>{errors.codeRegistration.message}</div>)}
                                        {codeRegistration ? <p className='docTypeMessage-style'>{codeRegistration}</p> : null}
                                </Form.Group> 

                                <Form.Group controlId='selectLocation'>
                                    <Form.Label className="mt-3">{CARS_CREATE_CAR_MAIN_LOCATION_TITLE}</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                            {...register("selectLocation",{})}                                  
                                        name = 'selectLocation'
                                        onChange = {selectHandler}
                                    >
                                        <option value='0' hidden></option>
                                        {locations.map(location => (
                                            <option key={location.id} value={location.id}>{location.short_name}</option>
                                        ))}
                                    </Form.Select>
                                    {locatisationMessage ? <p className='docTypeMessage-style'>{locatisationMessage}</p> : null}
                                </Form.Group>                    

                                <Form.Label className="mt-3">{CARS_CREATE_CHOOSE_PICTURE}</Form.Label>
                                <Form.Group controlId="formFile" className='test-img'>
                                    <Form.Control 
                                        type="file"
                                        onChange={uploadFileHandler}
                                    />
                                </Form.Group>

                                <Button type='submit' variant='primary' className='my-3 bnt-block bg-brown rounded'>
                                    {BTN_SAVE}
                                </Button>
                            </Form>
                    
            </FormContainer>
        </main>
    )
}

export default CarsCreate
