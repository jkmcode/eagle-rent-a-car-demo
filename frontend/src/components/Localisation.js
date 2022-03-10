import React,{ useState, useEffect } from 'react'
import Header from './Header';
import FormContainer from './FormContainer';
import { Card, ListGroup, Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';
import { listLocation, getLocationDetails } from '../action/locationAction';
import { LinkContainer } from 'react-router-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
        faEdit,
        faAngleDoubleLeft
} from "@fortawesome/free-solid-svg-icons"

function Localisation() {

    const locationList = useSelector(state => state.locationList)
    const {loading, error, locations} = locationList
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Variables for error handling
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        dispatch(listLocation()) 
    }, [])

    const createLocateHandler = () =>{
        navigate('/admin/createlocation')
    }

    //UseEffect -słownik błędów
    useEffect(() => {
        if(error){
            if(error==='Request failed with status code 500'){
                setErrorMessage('Błąd serwera lub brak dostępu do internetu. Sprawdź połaczenie z internetem i uruchom aplikacje jeszcze raz.')
                
            }else if (error==='Podany kod rejestracyjny już istnieje'){
                setErrorMessage(error)
            }
        }
  
    }, [error])

    return (
        <main>
            <Header />
            <FormContainer>
                {loading 
                  ? (<Loader/>)
                  : errorMessage
                    ? (<Message variant='danger'>{errorMessage}</Message>)
                    : (
                        <section>
                            <Row>
                                <Col >
                                    <h2 className="localisation-title">Lokalizacje</h2>
                                </Col>
                                <Col className='btn-position-right'>
                                    <div>
                                        <LinkContainer to={`/admin`}>  
                                            <Button className='btn-md btn-back mt-1 mb-1'>
                                                <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                                            </Button>
                                        </LinkContainer>                                          
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='btn-position-right'>
                                    <div>
                                        <Button className="new-location-bg mb-5" onClick={createLocateHandler}>
                                            <i className="fas fa-plus"></i> Nowa lokalizacja  
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            {locations
                                ?  (<div >
                                        {locations.map(location => (
                                            <Card key={location.id} className='mb-3 '>
                                                <ListGroup variant="flush" >
                                                    <ListGroup.Item className='card-list-color'>
                                                        <Row>
                                                            <Col className='location-short-name'>
                                                                <Image src = {location.image} className='img-sizing'/>
                                                                {location.short_name}
                                                            </Col>
                                                        
                                                        
                                                            <Col className='btn-location-edit-position'>
                                                                <LinkContainer to={`/admin/location/${location.id}/edit`}>
                                                                    <Button variant='warning' className='btn-md'>
                                                                        <FontAwesomeIcon icon={faEdit} /> Edycja
                                                                    </Button>
                                                                </LinkContainer>
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        ))}
                                    </div> ) 
                                :  <h1>Brak lokalizacji</h1>                   
                            }
                        </section>

                    )
                }
            </FormContainer>
        </main>
    )
}

export default Localisation
