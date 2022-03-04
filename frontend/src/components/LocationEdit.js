import axios from 'axios'
import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { Form, Button , Row, Col, Image} from 'react-bootstrap';
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
        faEdit,
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"

function LocationEdit() {

    const params = useParams()
    const locationId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [uploading, setUploading] = useState(false)
    const [msgTextUpload, setMsgTextUpload] = useState('')

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
        reset()

    }

    //UseEffect -słownik błędów
    useEffect(() => {
        if(errorDetailsFail){
            if(errorDetailsFail==='Request failed with status code 500'){
                setErrorMessage('Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
            }
        }

        if(errorUpdate){
            if(errorUpdate==='Request failed with status code 500'){
                setErrorUpdateMessage('Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
            }else{
                setErrorUpdateMessage('Błąd sieciowy. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
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
                                                <h3 className='location-edit-title'>Edytowanie lokalizacji</h3>
                                            </Col>
                                            <Col className='btn-position'>
                                                <LinkContainer to={`/admin/localisation`}>  
                                                    <Button className='btn-md btn-back'>
                                                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                                                    </Button>
                                                </LinkContainer>                                                  
                                            </Col>

                                        </Row>
                                        <Form.Label>Nazwa lokalizacji</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder = 'Brak nazwy lokalizacji'
                                            {...register("name", 
                                                {
                                                    required: 'Pole wymagane',
                                                    minLength: {
                                                        value: 10,
                                                        message: 'Nazwa lokalizacji musi składać się z przynajmniej 10 liter',
                                                    },
                                                    pattern: {
                                                        value: /[A-Za-z -]/,
                                                        message: 'Można uzywać tylko liter',
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
                                        <Form.Label>Nazwa skrócona</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder = 'Brak nazwy skróconej'
                                                {...register("shortName", 
                                                {
                                                    required: 'Pole wymagane',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Nazwa lokalizacji musi składać się z przynajmniej 2 litery',
                                                    },
                                                    pattern: {
                                                        value: /[A-Za-z -]/,
                                                        message: 'Można uzywać tylko liter',
                                                    },
                                                }                               
                                            )}
                                                onKeyUp={() => {trigger("shortName")}}
                                                name = 'shortName'
                                            >
                                            </Form.Control>
                                            {errors.shortName && (<div className='form-msg-style'>{errors.shortName.message}</div>)}
                                    </Form.Group> 

                                    <Form.Label className="mt-3">Wybierz zdjęcie</Form.Label>
                                    <Form.Group controlId="formFile" className='test-img'>
                                        <Form.Control 
                                            type="file"
                                            onChange={uploadFileHandler}
                                        />
                                        {uploading && <Loader/>}
                                        {msgTextUpload && <p className='text_img_uploaded'>Zdjęcie zostało pobrane</p>}
                                    
                                    </Form.Group>

                                    <Button type='submit' variant='primary' className='bnt-block bg-brown rounded my-3 btn-location-edit'>
                                        Zmień
                                    </Button>
                                </Form>                            
                            )
                    }
            </FormContainer>
        </main>
    )
}

export default LocationEdit
