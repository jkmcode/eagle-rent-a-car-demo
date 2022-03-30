import React,{ useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Loader from './Loader';
import Background from './Background';
import BackLogin from './BackToLogin'

import {
    MAINPAGE_TITLE
} from '../constants/EnvConstans'


function MainPage() {

    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading:userLoginLoading } = userLogin

    const locationList = useSelector(state => state.locationList)
    const { locations, loading } = locationList

    useEffect(() =>{
        if(!userInfo){
            navigate('/')
        }
    }, [ userInfo ])    

    return (
        <main>
            <BackLogin />
            {loading || userLoginLoading || !userInfo
                ? (<Loader/>)
                : 
                    <div>
                        <Header />
                            <Background>
                            <Container className="justify-content-md-center filter-location-position">
                                <h1 className='title pt-3'>{MAINPAGE_TITLE}</h1>
                                <Row xs={1} md={1} lg={2} >
                                        {locations.map(location => (
                                            <section key={location.id}>
                                                {location.is_active
                                                ? 
                                                    <Col >
                                                        <LinkContainer to= {`/mainpage/${location.id}/car-list`}> 
                                                            <div  className='btn-filter-location-position'>
                                                                <div>
                                                                    {location.short_name}
                                                                </div>
                                                                <Image src = {location.image} className='main-page-image'/>
                                                            </div>
                                                        </LinkContainer>
                                                    </Col>
                                                : null
                                                }                                       
                                            </section>
                                        ))}
                                </Row>
                            </Container> 
                        </Background> 
                    </div>  
            }
        
        </main>
    )
}

export default MainPage
