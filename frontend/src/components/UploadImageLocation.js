import React from 'react';
import Header from './Header';
import FormContainer from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button , Row, Col, Image} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { editLocationUploadImage } from '../action/locationAction';

function UploadImageLocation() {

    const locationDetails = useSelector(state => state.locationDetails)
    const { location } = locationDetails

    const params = useParams()
    const locationId = params.id

    const dispatch = useDispatch()

    const uploadFileHandler = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('locationId', locationId)

        dispatch(editLocationUploadImage(formData))
        //dispatch({type:CARS_DETAILS_RESET})
        //navigate(`/admin/car/${carId}/edit`)
    }

    return (
        <main>
            <Header />
            <FormContainer>
                <Row>
                    <Col>
                        <div>
                            <h4>Nazwa lokalizacji: {location.short_name}</h4>
                        </div>
                    </Col>
                    <Col className='position-img'>
                        {location.image
                            ? (<Image src = {location.image} className='car-edit-img-sizing'/>) : null                        
                        }
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

export default UploadImageLocation;
