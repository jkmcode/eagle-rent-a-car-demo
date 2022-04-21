import React, { useEffect, useState } from "react";
import Header from "./Header";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import { Card, ListGroup, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listOfCars } from "../action/carsAction";
import Message from "./Message";
import BackLogin from "./BackToLogin";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faAngleDoubleLeft,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import {
  CARS_ADMIN_TITLE,
  BTN_SHOW,
  BTN_EDIT,
  BTN_BACK,
  BTN_NEW_CAR,
} from "../constants/EnvConstans";

function CarsAdmin() {
  const carsList = useSelector((state) => state.carsList);
  const { loading, error, cars } = carsList;

  const dispatch = useDispatch();

  const [action] = useState("admin");

  useEffect(() => {
    dispatch(listOfCars());
  }, [dispatch]);

  const navigate = useNavigate();
  const createCarsHandler = () => {
    navigate("/admin/createcars");
  };

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        <Row>
          <Col>
            <h2 className="title-car-admin">{CARS_ADMIN_TITLE}</h2>
          </Col>
          <Col className="btn-position-right">
            <div>
              <LinkContainer to={`/admin`}>
                <Button className="btn-md btn-back mt-1 mb-1">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="btn-position-right">
            <div>
              <Button
                className="btn-new-car-bg mb-5"
                onClick={createCarsHandler}
              >
                <i className="fas fa-plus"></i> {BTN_NEW_CAR}
              </Button>
            </div>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            {cars.map((car) => (
              <Card key={car.id} className="mb-3">
                <ListGroup variant="flush">
                  <ListGroup.Item className="card-car-admin-bg">
                    <Row>
                      <Col>
                        <div>
                          <h4>{car.short_name}</h4>
                        </div>

                        <div>
                          <h5 className="car-registration-style">{car.name}</h5>
                        </div>

                        <div>
                          <h5 className="car-registration-style">
                            {car.code_registration}
                          </h5>
                        </div>

                        <div>
                          <Image
                            src={car.image}
                            className="car-admin-img-sizing"
                          />
                        </div>
                      </Col>

                      <Col className="carslist-position">
                        <div>
                          <LinkContainer to={`/car/${car.id}/show/${action}`}>
                            <Button variant="info" className="btn-md">
                              <FontAwesomeIcon icon={faEye} /> {BTN_SHOW}
                            </Button>
                          </LinkContainer>
                        </div>
                        <div>
                          <LinkContainer to={`/admin/car/${car.id}/edit`}>
                            <Button variant="warning" className="btn-md mt-1">
                              <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT}
                            </Button>
                          </LinkContainer>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ))}
          </div>
        )}
      </FormContainer>
    </main>
  );
}

export default CarsAdmin;
