import axios from 'axios'
import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { Form, Button , Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from "react-hook-form";
import { updateLocation, getLocationDetails, listLocation } from '../action/locationAction';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
        LOCATION_DETAILS_RESET,
        LOCATION_EDIT_RESET 
} from '../constants/LocationConstans';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"

import {
    LOCATION_EDIT_TITLE,
    LOCATION_EDIT_LOCATION_NAME_TITLE,
    LOCATION_EDIT_LOCATION_SHORT_NAME_TITLE,
    LOCATION_EDIT_CHOOSE_PICTURE,
    LOCATION_EDIT_LOCATION_NAME_PLACEHOLDER,
    LOCATION_EDIT_LOCATION_SHORT_NAME_PLACEHOLDER,
    LOCATION_EDIT_LOCATION_NAME_REQUIRED,
    LOCATION_EDIT_LOCATION_SHORT_NAME_REQUIRED,
    LOCATION_EDIT_LOCATION_NAME_MIN_LENGTH,
    LOCATION_EDIT_LOCATION_SHORT_NAME_MIN_LENGTH,
    LOCATION_EDIT_LOCATION_NAME_PATTERN,
    LOCATION_EDIT_LOCATION_SHORT_NAME_PATTERN,

    BTN_CHANGE,
    BTN_BACK,

    REQUEST_FAILED_WITH_STATUS_CODE_500,
    REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
    REQUEST_FAILED_REST_OF_STATUS_CODE
} from '../constants/EnvConstans'

function LocationEdit() {

    const params = useParams()
    const locationId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [uploading, setUploading] = useState(false)

    const locationUpdate = useSelector(state => state.locationUpdate)
    const { error: errorUpdate, success: successUpdate } = locationUpdate

    const locationDetails = useSelector(state => state.locationDetails)
    const {errorDetailsFail, loading, success, location} = locationDetails

    //Variables for error handling
    const [errorMessage, setErrorMessage] = useState('')
    const [errorUpdateMessage, setErrorUpdateMessage] = useState('')

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    useEffect(() =>{
        if(!errorDetailsFail){
            if(successUpdate){
                dispatch({type:LOCATION_DETAILS_RESET})
                dispatch({type:LOCATION_EDIT_RESET})
                navigate('/admin/localisation')
            } else {
                if(!location.name || location.id !== Number(locationId)){
                    dispatch(getLocationDetails(locationId))
                } 
                else {
                    reset({name:location.name, shortName:location.short_name})
                }
            }
        }
    }, [location, locationId, successUpdate, errorDetailsFail]) 

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('location_id', locationId)

        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/locations/upload/', formData, config)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }


    const submitHandler = (data) => {
        dispatch(updateLocation({
            id:location.id,
            name: data.name,
            shortName: data.shortName,
            isActive: true
        }))

        dispatch(listLocation()) 
        reset({name:data.name, shortName:data.shortName})

    }

    //UseEffect -słownik błędów
    useEffect(() => {
        if(errorDetailsFail){
            if(errorDetailsFail===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setErrorUpdateMessage(REQUEST_FAILED_REST_OF_STATUS_CODE)
            }
        }

        if(errorUpdate){
            if(errorUpdate===REQUEST_FAILED_WITH_STATUS_CODE_500){
                setErrorUpdateMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL)
            }else{
                setErrorUpdateMessage(REQUEST_FAILED_REST_OF_STATUS_CODE)
            }
        }
    }, [errorDetailsFail, errorUpdate])

    return (
        <main>
            <Header />
            <FormContainer>
                    {loading 
                        ? (<Loader/>)
                        : errorDetailsFail
                            ? (<Message variant='danger'>{errorMessage}</Message>)
                            : errorUpdate
                            ? (<Message variant='danger'>{errorUpdateMessage}</Message>)
                            : (
                                <Form onSubmit={handleSubmit(submitHandler)}>
                                    
                                    <Form.Group controlId='name'>
                                        <Row>
                                            <Col>
                                                <h3 className='location-edit-title'>{LOCATION_EDIT_TITLE}</h3>
                                            </Col>
                                            <Col className='btn-position'>
                                                <LinkContainer to={`/admin/localisation`}>  
                                                    <Button className='btn-md btn-back'>
                                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                                                    </Button>
                                                </LinkContainer>                                                  
                                            </Col>

                                        </Row>
                                        <Form.Label>{LOCATION_EDIT_LOCATION_NAME_TITLE}</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder = {LOCATION_EDIT_LOCATION_NAME_PLACEHOLDER}
                                            {...register("name", 
                                                {
                                                    required: LOCATION_EDIT_LOCATION_NAME_REQUIRED,
                                                    minLength: {
                                                        value: 10,
                                                        message: LOCATION_EDIT_LOCATION_NAME_MIN_LENGTH,
                                                    },
                                                    pattern: {
                                                        value: /[A-Za-z -]/,
                                                        message: LOCATION_EDIT_LOCATION_NAME_PATTERN,
                                                    },
                                                }                               
                                            )}
                                            onKeyUp={() => {trigger("name")}}
                                            name = 'name'
                                        >
                                        </Form.Control>
                                        {errors.name && (<div className='form-msg-style'>{errors.name.message}</div>)}
                                    </Form.Group>                       

                                    <Form.Group controlId='shortName'>
                                        <Form.Label>{LOCATION_EDIT_LOCATION_SHORT_NAME_TITLE}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder = {LOCATION_EDIT_LOCATION_SHORT_NAME_PLACEHOLDER}
                                                {...register("shortName", 
                                                {
                                                    required: LOCATION_EDIT_LOCATION_SHORT_NAME_REQUIRED,
                                                    minLength: {
                                                        value: 2,
                                                        message: LOCATION_EDIT_LOCATION_SHORT_NAME_MIN_LENGTH,
                                                    },
                                                    pattern: {
                                                        value: /[A-Za-z -]/,
                                                        message: LOCATION_EDIT_LOCATION_SHORT_NAME_PATTERN,
                                                    },
                                                }                               
                                            )}
                                                onKeyUp={() => {trigger("shortName")}}
                                                name = 'shortName'
                                            >
                                            </Form.Control>
                                            {errors.shortName && (<div className='form-msg-style'>{errors.shortName.message}</div>)}
                                    </Form.Group> 

                                    <Form.Label className="mt-3">{LOCATION_EDIT_CHOOSE_PICTURE}</Form.Label>
                                    <Form.Group controlId="formFile" className='test-img'>
                                        <Form.Control 
                                            type="file"
                                            onChange={uploadFileHandler}
                                        />
                                        {uploading && <Loader/>}
                                    
                                    </Form.Group>

                                    <Button type='submit' variant='primary' className='bnt-block bg-brown rounded my-3 btn-location-edit'>
                                        {BTN_CHANGE}
                                    </Button>
                                </Form>                            
                            )
                    }
            </FormContainer>
        </main>
    )
}

export default LocationEdit
