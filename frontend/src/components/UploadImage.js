import React from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { CARS_DETAILS_RESET } from '../constants/CarsConstans';
import { editCarUploadImage } from '../action/carsAction';
import { LinkContainer } from 'react-router-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons"

function UploadImage() {

    const params = useParams()
    const carId = params.id

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const carDetails = useSelector(state => state.carDetails)
    const { car } = carDetails

    const uploadFileHandler = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('car_id', carId)

        dispatch(editCarUploadImage(formData))
        dispatch({ type: CARS_DETAILS_RESET })
        navigate(`/admin/car/${carId}/edit`)
    }

    return (
        <main>
            <Header />
            <FormContainer>
                <Row>
                    <Col>
                        <div>
                            <h4>Nazwa samochodu: {car.short_name}</h4>
                            <h6>Numer rejestracyjny: {car.code_registration}</h6>
                        </div>
                    </Col>
                    <Col className='position-img'>
                        <div>
                            <LinkContainer to={`/admin/car/${carId}/edit`}>
                                <Button className='btn-md btn-back'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> Powrót
                                </Button>
                            </LinkContainer>
                        </div>
                        <div>
                            {car.image
                                ? (<Image src={car.image} className='car-edit-img-sizing' />) : null
                            }
                        </div>
                    </Col>
                </Row>
                <Form.Group controlId="formFile" className='test-img'>
                    <Form.Label className="mt-3">Wybierz zdjęcie</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={uploadFileHandler}
                    />

                </Form.Group>
            </FormContainer>
        </main>

    )
}

export default UploadImage;


