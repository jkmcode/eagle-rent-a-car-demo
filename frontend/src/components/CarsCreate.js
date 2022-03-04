import axios from 'axios'
import React,{ useState, useEffect } from 'react'
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCar, createCarUploadImage } from '../action/carsAction';
import { CARS_DETAILS_RESET, CARS_CREATE_RESET, CARS_CREATE_UPLOAD_IMAGE_RESET } from '../constants/CarsConstans';

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


        if(data.selectLocation === '0'){
            setLocatisationMessage('Pole wymagane')
        } 
        
        if(!data.name){
            setCarName('Pole wymagane')
        }else{
           setCarName('') 
        }
        
        if(!data.shortName){
            setCarShortName('Pole wymagane')
        }else{
            setCarShortName('')
        }
        
        if(!data.codeRegistration){
            setCodeRegistration('Pole wymagane')
        }else{
            setCodeRegistration('')
        }
        
        if(data.selectLocation !== '0'
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
            if(error==='Request failed with status code 500'){
                setErrorMessage('Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
            }else if (error==='Podany kod rejestracyjny już istnieje'){
                setErrorMessage(error)
            }else{
                setErrorMessage('Błąd sieciowy. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
            }   
        }

        if(errorUploadImage){
            setErrorMessageImage('Błąd sieciowy. Zdjęcie nie zostało dodane.')
        }
  
    }, [error, errorUploadImage])

    //UseEffect - komunikat success
    useEffect(() => {
        if(success){
            setSuccessMessage('Samochód został dodany do listy')
        }
    }, [success])

    return (
        <main>
            <Header />
            <FormContainer>
               <h2>Dodaj nowy samochód</h2>
               {success &&<Message variant='success'>{successMessage}</Message>}
               {error &&<Message variant='danger'>{errorMessage}</Message>}
               {errorUploadImage &&<Message variant='info'>{errorMessageImage}</Message>}
                        <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Nazwa samochodu</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder = 'Brak nazwy samochodu'
                                        {...register("name", 
                                            {
                                                //required: 'Pole wymagane',
                                                minLength: {
                                                    value: 10,
                                                    message: 'Nazwa samochodu musi składać się z przynajmniej 10 liter',
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
                                    <Form.Label>Nazwa skrócona</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder = 'Brak nazwy skróconej'
                                            {...register("shortName", 
                                            {
                                                //required: 'Pole wymagane',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Nazwa samochodu musi składać się z przynajmniej 2 liter',
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
                                        {carShortName ? <p className='docTypeMessage-style'>{carShortName}</p> : null}
                                </Form.Group> 

                                <Form.Group controlId='codeRegistration'>
                                    <Form.Label>Numer rejestracyjny</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder = 'Brak kodu rejestracyjnego'
                                            {...register("codeRegistration", 
                                            {
                                                //required: 'Pole wymagane',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Kod rejestracyjny musi składać się przynajmniej z 6 znaków',
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
                                    <Form.Label className="mt-3">Lokalizacja początkowa</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                            {...register("selectLocation", 
                                                {
                                                    //required: 'Pole wymagane',
                                                }                               
                                            )}
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

                                <Form.Label className="mt-3">Wybierz zdjęcie</Form.Label>
                                <Form.Group controlId="formFile" className='test-img'>
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

export default CarsCreate
