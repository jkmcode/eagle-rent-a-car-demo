import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-md-center position-vertically">
        <Col xs={12} md={9}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
