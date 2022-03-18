import React from 'react'
import Background from './Background';
import { Container, Row, Col } from 'react-bootstrap'

function LoginContainer({children}) {
    return (
        <Background >
            <Container className='parent-login'>
                <Row className='login'>
                    <Col xs={12} md={9}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </Background>
    )
}

export default LoginContainer