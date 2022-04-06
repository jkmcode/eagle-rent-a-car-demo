import React from "react";
import Header from "./Header";
import { Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import BackLogin from "./BackToLogin";

import {
  ADMIN_USERS_TITLE,
  ADMIN_LOCATIONS_TITLE,
  ADMIN_CARS_TITLE,
} from "../constants/EnvConstans";

function Admin() {
  return (
    <main>
      <BackLogin />
      <Header />
      <Container container-fluid="true" className="mt-3">
        <Row xs={1} md={1} lg={3} className="position-center">
          <LinkContainer to="/admin/userslist">
            <Col>
              <div className="intro-section mb-3">{ADMIN_USERS_TITLE}</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/localisation">
            <Col>
              <div className="intro-section mb-3">{ADMIN_LOCATIONS_TITLE}</div>
            </Col>
          </LinkContainer>
          <LinkContainer to="/admin/cars">
            <Col>
              <div className="intro-section mb-3">{ADMIN_CARS_TITLE}</div>
            </Col>
          </LinkContainer>
        </Row>
      </Container>
    </main>
  );
}

export default Admin;
