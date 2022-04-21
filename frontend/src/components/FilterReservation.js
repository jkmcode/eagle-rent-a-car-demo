import React, { useState, useEffect } from "react";
import Header from "./Header";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import Message from "./Message";

import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  ListGroup,
  Row,
  Col,
  Button,
  Image,
  FormControl,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import BackLogin from "./BackToLogin";
import { useForm } from "react-hook-form";

import { listOfReservations, deleteReservation } from "../action/carsAction";
import { FILTER_RESERVATIONS_RESET } from "../constants/CarsConstans";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faArrowCircleDown,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";

import {
  FILTER_RESERVATION_TITLE,
  FILTER_RESERVATION_SUBTITLE,
  FILTER_RESERVATION_DATE_FROM,
  FILTER_RESERVATION_DATE_TO,
  FILTER_RESERVATION_MORE_INFO_CLIENT,
  FILTER_RESERVATION_MORE_INFO_TEL,
  FILTER_RESERVATION_MORE_LOCATION,
  FILTER_RESERVATION_SEARCH_PLACEHOLDER,
  BTN_SEARCH,
  BTN_DELETE,
  BTN_EDIT,
  BTN_SHOW,
  BTN_WRAP_OUT,
  DELETE_RESERVATION_MSG,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
} from "../constants/EnvConstans";

function FilterReservation() {
  const dispatch = useDispatch();

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { register, handleSubmit } = useForm();

  //Fetch data from Redux
  const filterReservations = useSelector((state) => state.filterReservations);
  const { loading, error, filter: filterRes } = filterReservations;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const reservationDelete = useSelector((state) => state.reservationDelete);
  const { success: successDelete } = reservationDelete;

  //Error handling variables
  const [errorMessage, setErrorMessage] = useState("");

  //variables related to show info
  const [moreInfo, setMoreInfo] = useState(false);
  const [iterator, setIterator] = useState(0);
  const [lessInfo, setLessInfo] = useState(false);

  //delete function
  const deleteHandler = (id) => {
    if (window.confirm(DELETE_RESERVATION_MSG)) {
      dispatch({ type: FILTER_RESERVATIONS_RESET });
      dispatch(
        deleteReservation({
          id: id,
          creator: userInfo.id,
          type_change: "delete",
        })
      );
    }
  };

  const submitHandler = (data) => {
    setSearchInput(data.searchValue);

    if (data.searchValue === "") {
      setFilteredResults(filterRes);
    } else {
      const filteredData = filterRes.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(data.searchValue.toLowerCase());
      });

      const filteredData2 = filterRes.filter((item) => {
        return Object.values(item.id_cars)
          .join("")
          .toLowerCase()
          .includes(data.searchValue.toLowerCase());
      });

      const filteredDataSum = filteredData.concat(
        filteredData2.filter((item) => filteredData.indexOf(item) < 0)
      );

      setFilteredResults(filteredDataSum);
    }
  };

  useEffect(() => {
    console.log("render dla filteredResults", filteredResults);
  }, [filteredResults, iterator, moreInfo]);

  //function related to show info
  const moreInfoHandler = (index) => {
    if (moreInfo && index === iterator) {
      setMoreInfo(false);
      setLessInfo(false);
      setIterator(0);
    } else {
      setMoreInfo(true);
      setLessInfo(true);
      setIterator(index);
    }
  };

  //Fetch data from DB
  useEffect(() => {
    if (!filterRes[0]) {
      dispatch(listOfReservations());
    }
  }, [dispatch, filterRes, successDelete]);

  //Error handling related to database connection
  useEffect(() => {
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
      } else {
        setErrorMessage(REQUEST_FAILED_REST_OF_STATUS_CODE);
      }
    }
  }, [error]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : (
          <div>
            <h4>{FILTER_RESERVATION_TITLE}</h4>
            <Form
              onSubmit={handleSubmit(submitHandler)}
              className="d-flex mb-5"
            >
              <FormControl
                type="search"
                placeholder={FILTER_RESERVATION_SEARCH_PLACEHOLDER}
                className="me-2"
                aria-label="Search"
                {...register("searchValue")}
              />
              <Button type="submit" variant="outline-success">
                {BTN_SEARCH}
              </Button>
            </Form>
            <hr />
            <h4>{FILTER_RESERVATION_SUBTITLE}</h4>
            {filteredResults.length > 0
              ? filteredResults.map((res, index) => (
                  <Card key={res.id} className="mb-3">
                    <ListGroup variant="flush">
                      <ListGroup.Item className="card-car-admin-bg">
                        <Row>
                          <Col>
                            <div>
                              <h5>{res.id_cars.short_name}</h5>
                              <h6>{res.id_cars.code_registration}</h6>

                              <Image
                                src={res.id_cars.image}
                                className="car-admin-img-sizing"
                              />

                              <h6>
                                {" "}
                                {FILTER_RESERVATION_DATE_FROM}
                                {res.start_year}-
                                {res.start_month > 9
                                  ? res.start_month
                                  : `0${res.start_month}`}
                                -
                                {res.start_day > 9
                                  ? res.start_day
                                  : `0${res.start_day}`}{" "}
                                ,
                                {res.start_hour > 9
                                  ? res.start_hour
                                  : `0${res.start_hour}`}
                                :
                                {res.start_minute > 9
                                  ? res.start_minute
                                  : `0${res.start_minute}`}
                              </h6>

                              <h6>
                                {" "}
                                {FILTER_RESERVATION_DATE_TO}
                                {res.end_year}-
                                {res.end_month > 9
                                  ? res.end_month
                                  : `0${res.end_month}`}
                                -
                                {res.end_day > 9
                                  ? res.end_day
                                  : `0${res.end_day}`}{" "}
                                ,
                                {res.end_hour > 9
                                  ? res.end_hour
                                  : `0${res.end_hour}`}
                                :
                                {res.end_minute > 9
                                  ? res.end_minute
                                  : `0${res.end_minute}`}
                              </h6>
                            </div>
                          </Col>
                          <Col className="position-right-corner mt-2">
                            <div>
                              <LinkContainer
                                to={`/reservation/car/${res.location.id}/${res.id_cars.id}/filter-edit/${res.id}`}
                              >
                                <Button variant="warning" className="btn-md">
                                  <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT}
                                </Button>
                              </LinkContainer>
                            </div>

                            <div>
                              <Button
                                variant="danger"
                                className="btn-md mt-1"
                                onClick={() => deleteHandler(res.id)}
                              >
                                <i className="fas fa-trash"></i> {BTN_DELETE}
                              </Button>
                            </div>
                          </Col>
                          <hr />
                          <div>
                            {index + 1 === iterator ? (
                              <Button
                                variant="info"
                                className="btn-md btn-show-to-do"
                                onClick={() => moreInfoHandler(index + 1)}
                              >
                                <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                                {BTN_WRAP_OUT}
                              </Button>
                            ) : (
                              <Button
                                variant="info"
                                className="btn-md btn-show-to-do"
                                onClick={() => moreInfoHandler(index + 1)}
                              >
                                <FontAwesomeIcon icon={faArrowCircleDown} />{" "}
                                {BTN_SHOW}
                              </Button>
                            )}

                            {index + 1 === iterator ? (
                              <div>
                                <p className="font-weight-bold mt-1">
                                  {FILTER_RESERVATION_MORE_INFO_CLIENT}
                                </p>
                                <h6 className="m-0">{res.client_name}</h6>
                                <h6 className="m-0">
                                  {FILTER_RESERVATION_MORE_INFO_TEL}{" "}
                                  {res.client_phone}
                                </h6>
                                <h6 className="m-0">
                                  {FILTER_RESERVATION_MORE_LOCATION}{" "}
                                  {res.location.short_name}
                                </h6>
                              </div>
                            ) : null}
                          </div>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                ))
              : filterRes[0]
              ? filterRes.map((res, index) => (
                  <Card key={res.id} className="mb-3">
                    <ListGroup variant="flush">
                      <ListGroup.Item className="card-car-admin-bg">
                        <Row>
                          <Col>
                            <div>
                              <h5>{res.id_cars.short_name}</h5>
                              <h6>{res.id_cars.code_registration}</h6>

                              <Image
                                src={res.id_cars.image}
                                className="car-admin-img-sizing"
                              />

                              <h6>
                                {" "}
                                {FILTER_RESERVATION_DATE_FROM}
                                {res.start_year}-
                                {res.start_month > 9
                                  ? res.start_month
                                  : `0${res.start_month}`}
                                -
                                {res.start_day > 9
                                  ? res.start_day
                                  : `0${res.start_day}`}{" "}
                                ,
                                {res.start_hour > 9
                                  ? res.start_hour
                                  : `0${res.start_hour}`}
                                :
                                {res.start_minute > 9
                                  ? res.start_minute
                                  : `0${res.start_minute}`}
                              </h6>

                              <h6>
                                {" "}
                                {FILTER_RESERVATION_DATE_TO}
                                {res.end_year}-
                                {res.end_month > 9
                                  ? res.end_month
                                  : `0${res.end_month}`}
                                -
                                {res.end_day > 9
                                  ? res.end_day
                                  : `0${res.end_day}`}{" "}
                                ,
                                {res.end_hour > 9
                                  ? res.end_hour
                                  : `0${res.end_hour}`}
                                :
                                {res.end_minute > 9
                                  ? res.end_minute
                                  : `0${res.end_minute}`}
                              </h6>
                            </div>
                          </Col>
                          <Col className="position-right-corner mt-2">
                            <div>
                              <LinkContainer
                                to={`/reservation/car/${res.location.id}/${res.id_cars.id}/filter-edit/${res.id}`}
                              >
                                <Button variant="warning" className="btn-md">
                                  <FontAwesomeIcon icon={faEdit} /> {BTN_EDIT}
                                </Button>
                              </LinkContainer>
                            </div>

                            <div>
                              <Button
                                variant="danger"
                                className="btn-md mt-1"
                                onClick={() => deleteHandler(res.id)}
                              >
                                <i className="fas fa-trash"></i> {BTN_DELETE}
                              </Button>
                            </div>
                          </Col>
                          <hr />
                          <div>
                            {index + 1 === iterator ? (
                              <Button
                                variant="info"
                                className="btn-md btn-show-to-do"
                                onClick={() => moreInfoHandler(index + 1)}
                              >
                                <FontAwesomeIcon icon={faArrowCircleUp} />{" "}
                                {BTN_WRAP_OUT}
                              </Button>
                            ) : (
                              <Button
                                variant="info"
                                className="btn-md btn-show-to-do"
                                onClick={() => moreInfoHandler(index + 1)}
                              >
                                <FontAwesomeIcon icon={faArrowCircleDown} />{" "}
                                {BTN_SHOW}
                              </Button>
                            )}

                            {index + 1 === iterator ? (
                              <div>
                                <p className="font-weight-bold mt-1">
                                  {FILTER_RESERVATION_MORE_INFO_CLIENT}
                                </p>
                                <h6 className="m-0">{res.client_name}</h6>
                                <h6 className="m-0">
                                  {FILTER_RESERVATION_MORE_INFO_TEL}{" "}
                                  {res.client_phone}
                                </h6>
                                <h6 className="m-0">
                                  {FILTER_RESERVATION_MORE_LOCATION}{" "}
                                  {res.location.short_name}
                                </h6>
                              </div>
                            ) : null}
                          </div>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                ))
              : null}
          </div>
        )}
      </FormContainer>
    </main>
  );
}

export default FilterReservation;
