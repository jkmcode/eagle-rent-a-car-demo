import React,{ useState, useEffect } from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import Loader from './Loader';
import Message from './Message';
import { Form, Button , Row, Col, Image} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCarDetails, updateCar } from '../action/carsAction';
import { CARS_DETAILS_RESET, CAR_EDIT_RESET } from '../constants/CarsConstans';
import { LinkContainer } from 'react-router-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faEdit,
        faAngleDoubleLeft,
        faEye
} from "@fortawesome/free-solid-svg-icons"

function CarsEdit() {

    const params = useParams()
    const carId = params.id

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [locationId, setLocationId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const carDetails = useSelector(state => state.carDetails)
    const {error, loading, car} = carDetails

    const carEditUlopadImage = useSelector(state => state.carEditUploadImage)
    const {error: errorEditUploadImage} = carEditUlopadImage

    const carUpdate = useSelector(state => state.carUpdate)
    const {error: errorCarUpdate, loading: loadingCarUpdate, car: carEdit, success} = carUpdate

    const locationList = useSelector(state => state.locationList)
    const { locations } = locationList


    const [isActive, setIsActive] = useState(false)

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        trigger,
    } = useForm()

    //główny UseEffect
    useEffect(() =>{
        if(!error){
            if(!car.name || car.id !== Number(carId)){
                dispatch(getCarDetails(carId))
            }else{
                if(car.is_active){
                    setIsActive(true)
                }
                reset({
                    name:car.name, 
                    shortName:car.short_name,
                    codeRegistration:car.code_registration,
                    mainLocation:car.main_location.short_name,
                })
                setLocationId(car.main_location.id)
            }
        }
    }, [carId, car]) 

    //UseEffect -słownik błędów
    useEffect(() => {
        if(error || errorCarUpdate || errorEditUploadImage){
            if(error==='Request failed with status code 500' 
               || errorCarUpdate==='Request failed with status code 500'
               || errorEditUploadImage==='Request failed with status code 500'
            ){
                setErrorMessage('Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
            }
            else if (errorCarUpdate==='Podany kod rejestracyjny już istnieje'){
                setErrorMessage(errorCarUpdate)
            }
            else{
                setErrorMessage('Błąd sieciowy. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
            }   
        } 

    }, [error, errorCarUpdate, errorEditUploadImage])


    //UseEffect - komunikat success
    useEffect(() => {
        if(success){
            setSuccessMessage('Dane samochodu zostały zminione poprawnie')
        }
    }, [success])


    //UseEffect - kasowanie komunikatów  
    useEffect(() => {
        const timeout = setTimeout(() =>{
            if(errorCarUpdate){           
                dispatch({type:CAR_EDIT_RESET})
            }

            if(successMessage){
                dispatch({type:CAR_EDIT_RESET})
                dispatch({type:CARS_DETAILS_RESET})
                navigate('/admin/cars')
            }
        }, 7500)
        
        return () => clearTimeout(timeout)
    }, [errorCarUpdate, successMessage])
  

    const submitHandler = (data) => {

        if(data.selectLocation === '0'){
            data.selectLocation = locationId 
        }

        dispatch(updateCar({
            id: carId,
            name: data.name,
            shortName: data.shortName,
            selectLocation: data.selectLocation,
            codeRegistration: data.codeRegistration,
            isActive: isActive,
            creator: userInfo.id,
            type: 'Edit data'
        }))
        dispatch({type:CARS_DETAILS_RESET})
    }


    return (
        <main>
            <Header />
            <FormContainer>
                {loading
                    ? (<Loader/>)
                    : error 
                        ? (<Message variant='danger'>{errorMessage}</Message>)
                        : errorCarUpdate
                        ? (<Message variant='danger'>{errorMessage}</Message>)
                        : errorEditUploadImage
                        ? (<Message variant='danger'>{errorMessage}</Message>)
                        : (
                            <article>
                                {success &&<Message variant='success'>{successMessage}</Message>}
                                <Row>
                                    <Col>
                                        <h2 className='cars-edit-title'>Edycja samochodu</h2>
                                    </Col>
                                    <Col className='position-img'>
                                        {car.image
                                            ? ( 
                                                <div>
                                                    <div>
                                                        <LinkContainer to={`/admin/cars`}>
                                                            <Button className='btn-back'>
                                                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                                                            </Button>
                                                        </LinkContainer>
                                                        <LinkContainer to={`/upload-image/${carId}/`}>
                                                            <Button className='m-1'>Zmień</Button>
                                                        </LinkContainer>
                                                    </div>
                                                    <div>
                                                        <Image src = {car.image} className='car-edit-img-sizing'/>
                                                    </div>
                                                </div>   
                                            )
                                            : 
                                            <LinkContainer to={`/upload-image/${carId}/`}>
                                                <Button>Dodaj zdjęcie</Button>
                                            </LinkContainer>   
                                        }
                                    </Col>
                                </Row>
                                <Form onSubmit={handleSubmit(submitHandler)}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Nazwa samochodu</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder = 'Brak nazwy samochodu'
                                            {...register("name", 
                                                {
                                                    required: 'Pole wymagane',
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

                                    <Form.Group controlId='codeRegistration'>
                                        <Form.Label>Kod rejestracyjny</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder = 'Brak kodu rejestracyjnego'
                                                {...register("codeRegistration", 
                                                {
                                                    required: 'Pole wymagane',
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
                                    </Form.Group>

                                    <Form.Group controlId='mainLocation' >
                                        <Row >
                                            <Col md={6} xs={12}>
                                                <Form.Label className="mt-3">Lokalizacja początkowa</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    disabled
                                                    {...register("mainLocation")} 
                                                    name = 'mainLocation'
                                                >
                                                </Form.Control>
                                            </Col>
                                        

                                            <Col md={6} xs={12}>
                                            <Form.Label className="mt-3">Nowa lokalizacja początkowa</Form.Label>
                                            <Form.Select 
                                                aria-label="Default select example"
                                                    {...register("selectLocation", 
                                                        {
                                                            required: 'Pole wymagane',
                                                        }                               
                                                    )}
                                                name = 'selectLocation'
                                                defaultValue={locationId}
                                                
                                            >
                                                <option key='0' value='0' hidden></option>

                                                {locations.map(location => (
                                                    <option key={location.id} value={location.id}>{location.short_name}</option>
                                                ))}
                                            </Form.Select>

                                            {errors.mainLocation2 && (<div className='form-msg-style'>{errors.mainLocation2.message}</div>)}
                                            </Col>
                                        </Row>
                                    </Form.Group> 

                                    <Form.Group controlId='isactive' className='mt-3'>
                                        <Form.Check
                                            type='checkbox'
                                            label = 'Gotowy do wynajmu'
                                            checked ={isActive}
                                            name = 'isactive'
                                            onChange={(e) => setIsActive(e.target.checked)}
                                        >
                                        </Form.Check>
                                    </Form.Group>

                                    <Button type='submit' variant='primary' className='bnt-block bg-brown rounded my-3'>
                                        Zmień
                                    </Button>
                                </Form>
                            </article>
                        )
                }
            </FormContainer>
        </main>
    )
}

export default CarsEdit
