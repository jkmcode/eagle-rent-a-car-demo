import React from 'react';
import Header from './Header';
import { Row, Col, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Admin() {
    return (
        <main>
            <Header />
            <Container container-fluid="true" className='mt-3'>
                <Row xs={1} md={1} lg={3} className='position-center'>
                    <LinkContainer to="/admin/userslist"> 
                        <Col>
                            <div className='intro-section mb-3'>
                                Użytkownicy
                            </div>
                        </Col>
                    </LinkContainer> 
                    <LinkContainer to="/admin/localisation"> 
                        <Col>
                            <div className='intro-section mb-3'>
                                Lokalizacje
                            </div>
                        </Col>
                    </LinkContainer> 
                    <LinkContainer to="/admin/cars"> 
                        <Col>
                            <div className='intro-section mb-3'>
                                Samochody
                            </div>
                        </Col>
                    </LinkContainer> 
                </Row>
            </Container>

        </main>
    )
}

export default Admin
