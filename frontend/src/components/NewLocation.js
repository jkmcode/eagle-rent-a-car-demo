import React,{ useState, useEffect } from 'react'
import Header from './Header';
import FormContainer from './FormContainer';
import { Form, Button, Row, Col  } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { createLocation, createLocatisationUploadImage } from '../action/locationAction';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { 
    LOCATION_CREATE_UPLOAD_IMAGE_RESET, 
    LOCATION_CREATE_RESET,
    LOCATION_DETAILS_RESET 
} from '../constants/LocationConstans';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"


function NewLocation() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [flag, setFlag] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const locationCreate = useSelector(state => state.locationCreate)
    const { error, loading, success } = locationCreate

    const locationCreateUploadImage = useSelector(state => state.locationCreateUploadImage)
    const { error: errorUploadImage } = locationCreateUploadImage

    const [ulopadImage, setUploadImage] = useState('')
    const [selects, setSelects] = useState('')
    const [suppUniqueVar, setSuppUniqueVar] = useState('')

    //Variables for error handling
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errorMessageImage, setErrorMessageImage] = useState('')

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    const onSubmit = (data) => {
        let unique_supp_var = Date.now()
        dispatch(createLocation({
            'creator':userInfo._id,
            'name':data.name,
            'shortName': data.shortName,
            'image': data.image,
            'supp_unique_var': unique_supp_var
        }))

        setFlag(true)
        setSuppUniqueVar(unique_supp_var)
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setUploadImage(file)
        setSelects(file)
    }

    const onSubmitExecute = async () =>  {
        const formData = new FormData()

        formData.append('image', ulopadImage)
        formData.append('suppUniqueVar', suppUniqueVar)

        dispatch(createLocatisationUploadImage(formData))
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
            if(successMessage){
                dispatch({type:LOCATION_CREATE_RESET})
                dispatch({type:LOCATION_CREATE_UPLOAD_IMAGE_RESET}) 
                dispatch({type:LOCATION_DETAILS_RESET})
                navigate('/admin/localisation')
                reset()
            }   
            
            if(errorUploadImage){
                dispatch({type:LOCATION_CREATE_RESET})
                dispatch({type:LOCATION_CREATE_UPLOAD_IMAGE_RESET})  
                dispatch({type:LOCATION_DETAILS_RESET})       
            }

            if(errorMessage){
                dispatch({type:LOCATION_CREATE_RESET})
                dispatch({type:LOCATION_CREATE_UPLOAD_IMAGE_RESET}) 
                dispatch({type:LOCATION_DETAILS_RESET})
            }
        }, 7500)
        
        return () => clearTimeout(timeout)
    }, [successMessage, errorMessageImage, errorMessage])

    //UseEffect -słownik błędów
    useEffect(() => {
        if(error){
            if(error==='Request failed with status code 500'){
                setErrorMessage('Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
                const timeout = setTimeout(() =>{
                    dispatch({type:LOCATION_CREATE_RESET}) 
                    setErrorMessage('')
                }, 7500)
                
            }else if (error==='Podana nazwa już istnieje'){
                setErrorMessage(error)
                const timeout = setTimeout(() =>{
                    dispatch({type:LOCATION_CREATE_RESET})
                    setErrorMessage('')
                }, 7500)
            }else{
                setErrorMessage('Błąd sieciowy. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
                const timeout = setTimeout(() =>{
                    dispatch({type:LOCATION_CREATE_RESET})
                    setErrorMessage('')
                }, 7500)
            }   
        }

        if(errorUploadImage){
            setErrorMessageImage('Błąd sieciowy. Zdjęcie nie zostało dodane.')
            dispatch({type:LOCATION_CREATE_RESET})
            setErrorMessageImage('')
        }
  
    }, [error, errorUploadImage])

    //UseEffect - komunikat success
    useEffect(() => {
        if(success){
            setSuccessMessage('Lokalizacja została dodana do listy')
        }
    }, [success])


    return (
        <main>
            <Header />
            <FormContainer>
               {success &&<Message variant='success'>{successMessage}</Message>}
               {errorMessage ? <Message variant='danger'>{errorMessage}</Message> : null}
               {errorUploadImage &&<Message variant='danger'>{errorMessageImage}</Message>}
               <Row>
                   <Col>
                        <h2>Utwórz Lokalizacje</h2>
                   </Col>
                   <Col className='btn-position'>
                        <LinkContainer to={`/admin/localisation`}>  
                            <Button className='btn-md btn-back'>
                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                            </Button>
                        </LinkContainer> 
                   </Col>
               </Row>
               
               <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nazwa lokalizacja</Form.Label>
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
                                        message: 'Nazwa lokalizacji musi składać się z przynajmniej 2 liter',
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

                    <Form.Group controlId="formFile" className='test-img'>
                    <Form.Label className="mt-3">Wybierz zdjęcie</Form.Label>
                        <Form.Control 
                            type="file"
                            onChange={uploadFileHandler}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='my-3 bnt-block bg-brown rounded'>
                        Zapisz
                    </Button>
                </Form>
            </FormContainer>
        </main>
    )
}

export default NewLocation

