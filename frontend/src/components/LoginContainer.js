import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function LoginContainer({ children }) {
  return (
    <Container className="parent-login">
      <Row className="login">
        <Col xs={9} md={9}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default LoginContainer;
