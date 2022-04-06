import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Image, Button, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Loader from "./Loader";
import Message from "./Message";
import FormContainer from "./FormContainer";
import BackLogin from "./BackToLogin";
import { LinkContainer } from "react-router-bootstrap";
import {
  listOfCarOfReservations,
  getCarDetails,
  deleteReservation,
} from "../action/carsAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faAngleDoubleLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import {
  CAR_EDIT_RESERVATION_NO_RESERVATION_TITLE,
  CAR_EDIT_RESERVATION_DELETE_MSG,
  CAR_EDIT_RESERVATION_PHONE_NO,
  CAR_EDIT_RESERVATION_EMAIL,
  DELETE,
  BTN_BACK,
  BTN_CALENDAR,
  BTN_EDIT,
  BTN_DELETE,
} from "../constants/EnvConstans";

function CarEditReservation() {
  const params = useParams();
  const carId = params.id;
  const locationId = params.idLocation;
  const dispatch = useDispatch();

  //Fetch data from Redux
  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carsListReservation = useSelector((state) => state.carsListReservation);
  const { error, loading, reservations } = carsListReservation;

  const reservationDelete = useSelector((state) => state.reservationDelete);
  const { success: successDelete } = reservationDelete;

  const locationList = useSelector((state) => state.locationList);
  const { locations } = locationList;

  //variables related to URL
  const [action, setAction] = useState("single-edit");
  const [actionEditList, setActionEditList] = useState("edit-reservation");

  const deleteHandler = (id) => {
    if (window.confirm(CAR_EDIT_RESERVATION_DELETE_MSG)) {
      dispatch(
        deleteReservation({
          id: id,
          creator: userInfo.id,
          type_change: "delete",
        })
      );
    }
  };

  useEffect(() => {
    if (!car || car.id != carId) {
      dispatch(getCarDetails(carId));
    }

    dispatch(
      listOfCarOfReservations({
        carId: carId,
        locationId: locationId,
      })
    );
  }, [successDelete, car]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <section>
            <Row>
              <Col>
                <Image src={car.image} className="car-show-img-sizing" />
                <h4> {car.name}</h4>
                <h5>
                  {" "}
                  {CAR_EDIT_RESERVATION_NO_RESERVATION_TITLE}{" "}
                  {car.code_registration}
                </h5>
              </Col>
              <Col className="right-position">
                <LinkContainer to={`/mainpage/${locationId}/car-list`}>
                  <Button variant="dark" className="btn-md">
                    <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                  </Button>
                </LinkContainer>

                <LinkContainer
                  to={`/car/${car.id}/show/rent/${locationId}/${actionEditList}`}
                >
                  <Button variant="info" className="btn-md m-1">
                    <FontAwesomeIcon icon={faCalendar} /> {BTN_CALENDAR}
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
            {reservations.map((res) => (
              <Card key={res.id} className="mb-3 card-edit-reservation">
                <Row>
                  <Col>
                    <h5>{res.client_name}</h5>
                    <div className="date-reservation">
                      {res.start_year}-
                      {res.start_month > 9
                        ? res.start_month
                        : `0${res.start_month}`}
                      -{res.start_day > 9 ? res.start_day : `0${res.start_day}`}{" "}
                      ,
                      {res.start_hour > 9
                        ? res.start_hour
                        : `0${res.start_hour}`}
                      :
                      {res.start_minute > 9
                        ? res.start_minute
                        : `0${res.start_minute}`}
                    </div>
                    <div className="date-reservation">
                      {res.end_year}-
                      {res.end_month > 9 ? res.end_month : `0${res.end_month}`}-
                      {res.end_day > 9 ? res.end_day : `0${res.end_day}`} ,
                      {res.end_hour > 9 ? res.end_hour : `0${res.end_hour}`}:
                      {res.end_minute > 9
                        ? res.end_minute
                        : `0${res.end_minute}`}
                    </div>
                    <div>
                      <hr />
                      <div>
                        {CAR_EDIT_RESERVATION_PHONE_NO} {res.client_phone}
                      </div>
                      {res.client_email ? (
                        <div>
                          {CAR_EDIT_RESERVATION_EMAIL} {res.client_email}
                        </div>
                      ) : null}
                    </div>
                  </Col>
                  <Col></Col>
                  <Col className="carslist-edit-reservation">
                    <LinkContainer
                      to={`/reservation/car/${locationId}/${carId}/${action}/${res.id}`}
                    >
                      <Button variant="warning" className="btn-md">
                        <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT}
                      </Button>
                    </LinkContainer>

                    <div>
                      <Button
                        variant="danger"
                        className="btn-md mt-1"
                        onClick={() => deleteHandler(res.id)}
                      >
                        <i className={DELETE}></i> {BTN_DELETE}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            ))}
          </section>
        )}
      </FormContainer>
    </main>
  );
}
export default CarEditReservation;
