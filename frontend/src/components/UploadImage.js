import React from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { CARS_DETAILS_RESET } from '../constants/CarsConstans';
import { editCarUploadImage } from '../action/carsAction';
import { LinkContainer } from 'react-router-bootstrap';
import BackLogin from './BackToLogin';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons"

import {
    UPLOAD_IMAGE_REGISTRATION_NO_TITLE,
    UPLOAD_IMAGE_CHOOSE_PICTURE,

    BTN_BACK
} from '../constants/EnvConstans'

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
            <BackLogin />
            <Header />
            <FormContainer>
                <Row>
                    <Col>
                        <div>
                            <h4>{car.short_name}</h4>
                            <h6>{UPLOAD_IMAGE_REGISTRATION_NO_TITLE} {car.code_registration}</h6>
                        </div>
                    </Col>
                    <Col className='position-img'>
                        <div>
                            <LinkContainer to={`/admin/car/${carId}/edit`}>
                                <Button className='btn-md btn-back'>
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
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
                    <Form.Label className="mt-3">{UPLOAD_IMAGE_CHOOSE_PICTURE}</Form.Label>
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


