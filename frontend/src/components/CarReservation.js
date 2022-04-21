import React, { useState, useEffect } from "react";
import Header from "./Header";
import FormContainer from "./FormContainer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import Message from "./Message";
import Loader from "./Loader";
import BackLogin from "./BackToLogin";
import "../App.css";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { createReservation, getCarDetails } from "../action/carsAction";
import { getLocationDetails } from "../action/locationAction";
import { CAR_RESERVATION_RESET } from "../constants/CarsConstans";
import { scroller } from "react-scroll";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";

import {
  CAR_RESERVATION_TITLE,
  CAR_RESERVATION_CUSTOMER_NAME_TITLE,
  CAR_RESERVATION_DUCUMENT_TYPE_TITLE,
  CAR_RESERVATION_PHONE_NO_TITLE,
  CAR_RESERVATION_DUCUMENT_NO_TITLE,
  CAR_RESERVATION_EMAIL_TITLE,
  CAR_RESERVATION_RENT_FROM_TITLE,
  CAR_RESERVATION_RENT_TO_TITLE,
  CAR_RESERVATION_TIME_TITLE,
  CAR_RESERVATION_NOTE_TITLE,
  CAR_RESERVATION_LOCATISATION_SUBTITLE,
  CAR_RESERVATION_LOCATION_TITLE,
  CAR_RESERVATION_NO_CUSTOMER_NAME,
  CAR_RESERVATION_DATE_FROM,
  CAR_RESERVATION_DATE_TO,
  CAR_RESERVATION_REGISTRATION_NO,
  CAR_RESERVATION_MIN_LENGTH_MSG,
  CAR_RESERVATION_MIN_LENGTH_VALUE,
  CAR_RESERVATION_REQUIRED_CLIENT_NAME,
  CAR_RESERVATION_SELECT_FROM_THE_LIST,
  CAR_RESERVATION_DOCUMENT_NO_REQUIRED,
  CAR_RESERVATION_INPROPER_PHONE_NO,
  CAR_RESERVATION_PHONE_NO_REQUIRED,
  CAR_RESERVATION_MAX_LENGTH_MSG,
  CAR_RESERVATION_MAX_LENGTH_VALUE,
  CAR_RESERVATION_INPROPER_EMAIL,
  CAR_RESERVATION_DATE_AND_TIME_REQUIRED,
  CAR_RESERVATION_REQUIRED_LOCATION,
  CAR_RESERVATION_OPTION_0,
  CAR_RESERVATION_OPTION_PASSPORT,
  CAR_RESERVATION_OPTION_ID,
  CAR_RESERVATION_OPTION_DRIVING_LICENSE,
  CAR_RESERVATION_OPTION_OTHER,
  CAR_RESERVATION_CREATE_MSG,
  CAR_RESERVATION_ERROR_HANDLING_SUCCESS,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_1,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_2,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_3,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_4,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_5,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_6,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG,
  ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG,
  SET_DATE_TIME_RESERVATION,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  MIN_DURATION,
  MIN_DURATION_MSG,
  SET_DATE_TIME_RESERVATION_MSG,
  TIME_CLEAR_MSG,
  TIME_STEP,
  TIME_MIN_VALUE,
  TIME_MAX_VALUE,
  TIME_DEFAULT_VALUE_START,
  TIME_DEFAULT_VALUE_END,
  TRANSFER_TIME,
  BTN_BACK,
  OPTION_0,
  BTN_RESRVATION,
} from "../constants/EnvConstans";

import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";

function CarReservation() {
  const params = useParams();

  const carId = params.id;
  const locationId = params.idLocation;
  const action = params.action;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching data from Redux
  const locationList = useSelector((state) => state.locationList);
  const { locations } = locationList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carReservationCreate = useSelector(
    (state) => state.carReservationCreate
  );
  const { loading, car, error } = carReservationCreate;

  const carDetails = useSelector((state) => state.carDetails);
  const { car: carCarDetails, error: errorCarDetails } = carDetails;

  const locationDetails = useSelector((state) => state.locationDetails);
  const { errorDetailsFail, location: locationInfo } = locationDetails;

  //Fetch data from Localstorage
  const fiterRangeofDateFromStorage = localStorage.getItem("filterRangeOfDate")
    ? JSON.parse(localStorage.getItem("filterRangeOfDate"))
    : null;

  // Form variables
  const [docTypeMessage, setDocTypeMessage] = useState("");
  const [newEvent, setNewEvent] = useState({ start: "", end: "" });
  const [startDateMsg, setStartDateMsg] = useState("");
  const [endDateMsg, setEndDateMsg] = useState("");
  const [wrongBackDateMsg, setWrongBackDateMsg] = useState("");
  const [dateMsg, setDateMsg] = useState("");
  const [dateMsgSuccess, setDateMsgSuccess] = useState("");
  const [dateMsgError, setDateMsgError] = useState("");
  const [nrDocMsg, setNrDocMsg] = useState("");
  const [clientNameMsg, setClientNameMsg] = useState("");
  const [endTimeValue, setEndTimeValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState("");
  const [phoneNrMsg, setPhoneNrMsg] = useState("");
  const [location, setLocation] = useState("");

  const [selectStartTimeMsg, setSelectStartTimeMsg] = useState("");
  const [selectEndTimeMsg, setSelectEndTimeMsg] = useState("");

  const [getStartTimeHoursAndMinutes, setStartTimeGetHoursAndMinutes] =
    useState("");
  const [getEndTimeHoursAndMinutes, setEndTimeGetHoursAndMinutes] =
    useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm();

  registerLocale("pl", pl);

  const [language] = useState("pl");

  const submitHandler = (data) => {
    scroller.scrollTo("navbar", { smooth: true, offset: -90, duration: 10 });

    let startDateTimeCombiner = newEvent.start;
    let endDateTimeCombiner = newEvent.end;

    if (data.name) {
      setClientNameMsg("");
    } else {
      setClientNameMsg(CAR_RESERVATION_REQUIRED_CLIENT_NAME);
    }

    if (data.IdNumber) {
      setNrDocMsg("");
    } else {
      setNrDocMsg(CAR_RESERVATION_DOCUMENT_NO_REQUIRED);
    }

    if (getStartTimeHoursAndMinutes) {
      if (startDateTimeCombiner) {
        startDateTimeCombiner.setHours(getStartTimeHoursAndMinutes.getHours());
        startDateTimeCombiner.setMinutes(
          getStartTimeHoursAndMinutes.getMinutes()
        );
      }
    } else {
      setSelectStartTimeMsg(CAR_RESERVATION_DATE_AND_TIME_REQUIRED);
    }

    if (getEndTimeHoursAndMinutes) {
      if (endDateTimeCombiner) {
        endDateTimeCombiner.setHours(getEndTimeHoursAndMinutes.getHours());
        endDateTimeCombiner.setMinutes(getEndTimeHoursAndMinutes.getMinutes());
      }
    } else {
      setSelectEndTimeMsg(CAR_RESERVATION_DATE_AND_TIME_REQUIRED);
    }

    if (!startDateTimeCombiner) {
      setStartDateMsg(CAR_RESERVATION_DATE_AND_TIME_REQUIRED);
    } else if (
      startDateTimeCombiner <
      new Date().valueOf() + SET_DATE_TIME_RESERVATION
    ) {
      setStartDateMsg(SET_DATE_TIME_RESERVATION_MSG);
    }

    if (!endDateTimeCombiner) {
      setEndDateMsg(CAR_RESERVATION_DATE_AND_TIME_REQUIRED);
    } else if (endDateTimeCombiner - MIN_DURATION < startDateTimeCombiner) {
      setWrongBackDateMsg(MIN_DURATION_MSG);
    }

    if (data.documentType === OPTION_0) {
      setDocTypeMessage(CAR_RESERVATION_SELECT_FROM_THE_LIST);
    }

    if (data.phone) {
      setPhoneNrMsg("");
    } else {
      setPhoneNrMsg(CAR_RESERVATION_PHONE_NO_REQUIRED);
    }

    if (data.location === CAR_RESERVATION_OPTION_0) {
      setLocation(CAR_RESERVATION_REQUIRED_LOCATION);
    }

    if (
      getStartTimeHoursAndMinutes &&
      startDateTimeCombiner &&
      getEndTimeHoursAndMinutes &&
      endDateTimeCombiner &&
      data.documentType !== OPTION_0 &&
      startDateTimeCombiner >
        new Date().valueOf() + SET_DATE_TIME_RESERVATION &&
      endDateTimeCombiner - MIN_DURATION > startDateTimeCombiner
    ) {
      const startYear = startDateTimeCombiner.getFullYear();
      const startMonth = startDateTimeCombiner.getMonth() + 1;
      const startDay = startDateTimeCombiner.getDate();
      const startHours = startDateTimeCombiner.getHours();
      const startMinutes = startDateTimeCombiner.getMinutes();

      const endYear = endDateTimeCombiner.getFullYear();
      const endMonth = endDateTimeCombiner.getMonth() + 1;
      const endDay = endDateTimeCombiner.getDate();
      const endHours = endDateTimeCombiner.getHours();
      const endMinutes = endDateTimeCombiner.getMinutes();

      dispatch(
        createReservation({
          idCars: carId,
          name: data.name,
          documentType: data.documentType,
          IdNumber: data.IdNumber,
          phone: data.phone,
          email: data.email,
          dateFrom: `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes}`,
          dateTo: `${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`,
          location: data.location,
          note: data.note,
          creator: userInfo.id,
          timeReservation: SET_DATE_TIME_RESERVATION,
          transferTime: TRANSFER_TIME,
        })
      );
    }
  };

  //function from FormSelect
  const selectlocationHandler = () => {
    setLocation("");
  };

  const selectHandler = () => {
    setDocTypeMessage("");
  };

  const SubmitStartDate = (start) => {
    setNewEvent({ ...newEvent, start });
    setStartDateMsg("");
    setWrongBackDateMsg("");
  };

  const SubmitEndDate = (end) => {
    setNewEvent({ ...newEvent, end });
    setEndDateMsg("");
    setWrongBackDateMsg("");
  };

  const SubmitStartTime = (time) => {
    let getTime = time.nativeEvent.text;
    setStartTimeGetHoursAndMinutes(getTime);
    setSelectStartTimeMsg("");
    setWrongBackDateMsg("");
    setStartDateMsg("");
  };

  const SubmitEndTime = (time) => {
    let getTime = time.nativeEvent.text;
    setEndTimeGetHoursAndMinutes(getTime);
    setSelectEndTimeMsg("");
    setWrongBackDateMsg("");
  };

  // fetch carDetails and LocationDetails from database
  useEffect(() => {
    scroller.scrollTo("navbar", { smooth: true, offset: -90, duration: 10 });
    if (!errorCarDetails) {
      if (!carCarDetails.name || carCarDetails.id !== Number(carId)) {
        dispatch(getCarDetails(carId));
      }
    }

    if (!errorDetailsFail) {
      if (!locationInfo.name || locationInfo.id !== Number(locationId)) {
        if (locationId) {
          dispatch(getLocationDetails(locationId));
        }
      }
    }
  }, [carId, carCarDetails, locationId, locationInfo]);

  //Set Date and Time -- default or based on localStorage
  useEffect(() => {
    if (!getStartTimeHoursAndMinutes) {
      setStartTimeValue(new Date(TIME_DEFAULT_VALUE_START));
      setStartTimeGetHoursAndMinutes(new Date(TIME_DEFAULT_VALUE_START));
    }

    if (!getEndTimeHoursAndMinutes) {
      setEndTimeValue(new Date(TIME_DEFAULT_VALUE_END));
      setEndTimeGetHoursAndMinutes(new Date(TIME_DEFAULT_VALUE_END));
    }

    if (fiterRangeofDateFromStorage && action) {
      setNewEvent({
        ...newEvent,
        start: new Date(fiterRangeofDateFromStorage.date_from),
        end: new Date(fiterRangeofDateFromStorage.date_to),
      });
      setStartTimeValue(new Date(fiterRangeofDateFromStorage.time_from));
      setEndTimeValue(new Date(fiterRangeofDateFromStorage.time_to));
    }
  }, []);

  //UseEffect - Error handling and success, set default time
  useEffect(() => {
    if (car === CAR_RESERVATION_ERROR_HANDLING_SUCCESS) {
      dispatch({ type: CAR_RESERVATION_RESET });
      setDateMsgSuccess(CAR_RESERVATION_CREATE_MSG);
      const timeout = setTimeout(() => {
        if (action) {
          navigate(`/mainpage`);
        } else {
          navigate(`/car/${carId}/show/id-location/${locationId}`);
        }
      }, TIME_CLEAR_MSG);
    }
    if (car === ERROR_HANDLING_EXIST_RANGE_DATE_EX_1) {
      setDateMsg(ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG);
    }
    if (car === ERROR_HANDLING_EXIST_RANGE_DATE_EX_2) {
      setDateMsg(ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG);
    }
    if (car === ERROR_HANDLING_EXIST_RANGE_DATE_EX_3) {
      setDateMsg(ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG);
    }

    if (car === ERROR_HANDLING_EXIST_RANGE_DATE_EX_4) {
      setDateMsg(ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG);
    }
    if (car === ERROR_HANDLING_EXIST_RANGE_DATE_EX_5) {
      setDateMsg(ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG);
    }
    if (car === ERROR_HANDLING_EXIST_RANGE_DATE_EX_6) {
      setDateMsg(ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG);
    }
  }, [navigate, car, loading]);

  //UseEffect - Error handling with connection to database
  useEffect(() => {
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setDateMsgError(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
      } else {
        setDateMsgError(REQUEST_FAILED_REST_OF_STATUS_CODE);
      }
    }
  }, [error]);

  //UseEffect - Error handling - remove content
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDateMsg("");
      setDateMsgSuccess("");
      setDateMsgError("");
      dispatch({ type: CAR_RESERVATION_RESET });
    }, TIME_CLEAR_MSG);

    return () => clearTimeout(timeout);
  }, [dispatch, dateMsg, dateMsgSuccess]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {loading && <Loader />}
        {dateMsgSuccess && (
          <Message variant="success">{dateMsgSuccess}</Message>
        )}
        {dateMsg && <Message variant="danger">{dateMsg}</Message>}
        {dateMsgError && <Message variant="danger">{dateMsgError}</Message>}
        <Row>
          <Col>
            <div>
              <h3>{CAR_RESERVATION_TITLE}</h3>
              <Image
                src={carCarDetails.image}
                className="car-show-img-sizing"
              />
              <h4>{carCarDetails.short_name}</h4>
              <h5>
                {CAR_RESERVATION_REGISTRATION_NO}{" "}
                {carCarDetails.code_registration}
              </h5>
              <hr />
            </div>
          </Col>
          <Col className="btn-position">
            {!action ? (
              <LinkContainer
                to={`/car/${carId}/show/id-location/${locationId}`}
              >
                <Button variant="warning" className="btn-back">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                </Button>
              </LinkContainer>
            ) : (
              <LinkContainer to={`/car/${carId}/show/search-reservation`}>
                <Button variant="warning" className="btn-back">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                </Button>
              </LinkContainer>
            )}
          </Col>
        </Row>
        <h4>Informacje o kliencie</h4>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId="name">
            <Form.Label>{CAR_RESERVATION_CUSTOMER_NAME_TITLE}</Form.Label>
            <Form.Control
              type="text"
              placeholder={CAR_RESERVATION_NO_CUSTOMER_NAME}
              className="form-reservation"
              {...register("name", {
                minLength: {
                  value: CAR_RESERVATION_MIN_LENGTH_VALUE,
                  message: CAR_RESERVATION_MIN_LENGTH_MSG,
                },
              })}
              onKeyUp={() => {
                trigger("name");
              }}
              name="name"
            ></Form.Control>
            {clientNameMsg ? (
              <p className="docTypeMessage-style">{clientNameMsg}</p>
            ) : null}
            {errors.name && (
              <div className="form-msg-style">{errors.name.message}</div>
            )}
          </Form.Group>

          <Form.Group controlId="idDoc">
            <Row>
              <Col md={6} xs={12}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_DUCUMENT_TYPE_TITLE}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="documentType"
                  {...register("documentType")}
                  onChange={selectHandler}
                  className="form-reservation"
                >
                  <option value={CAR_RESERVATION_OPTION_0} hidden></option>
                  <option value={CAR_RESERVATION_OPTION_PASSPORT}>
                    {CAR_RESERVATION_OPTION_PASSPORT}
                  </option>
                  <option value={CAR_RESERVATION_OPTION_ID}>
                    {CAR_RESERVATION_OPTION_ID}
                  </option>
                  <option value={CAR_RESERVATION_OPTION_DRIVING_LICENSE}>
                    {CAR_RESERVATION_OPTION_DRIVING_LICENSE}
                  </option>
                  <option value={CAR_RESERVATION_OPTION_OTHER}>
                    {CAR_RESERVATION_OPTION_OTHER}
                  </option>
                </Form.Select>

                {docTypeMessage ? (
                  <p className="docTypeMessage-style">{docTypeMessage}</p>
                ) : null}
              </Col>

              <Col md={6} xs={12}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_DUCUMENT_NO_TITLE}
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-reservation"
                  {...register("IdNumber")}
                  name="IdNumber"
                ></Form.Control>
                {nrDocMsg ? (
                  <p className="docTypeMessage-style">{nrDocMsg}</p>
                ) : null}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="idPhoneEmail">
            <Row>
              <Col md={6} xs={12}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_PHONE_NO_TITLE}
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-reservation"
                  {...register("phone", {
                    pattern: {
                      value: /^[+-]?\d*(?:[.,]\d*)?$/,
                      message: CAR_RESERVATION_INPROPER_PHONE_NO,
                    },

                    maxLength: {
                      value: CAR_RESERVATION_MAX_LENGTH_VALUE,
                      message: CAR_RESERVATION_MAX_LENGTH_MSG,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("phone");
                  }}
                  name="phone"
                ></Form.Control>
                {errors.phone && (
                  <div className="form-msg-style">{errors.phone.message}</div>
                )}
                {phoneNrMsg ? (
                  <p className="docTypeMessage-style">{phoneNrMsg}</p>
                ) : null}
              </Col>

              <Col md={6} xs={12}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_EMAIL_TITLE}
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-reservation"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: CAR_RESERVATION_INPROPER_EMAIL,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                  name="email"
                ></Form.Control>
                {errors.email && (
                  <div className="form-msg-style">{errors.email.message}</div>
                )}
              </Col>
            </Row>
          </Form.Group>
          <hr />
          <h4>Termin rezerwacji</h4>
          <Form.Group controlId="datePicker">
            <Row>
              <Col md={4} xs={8}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_RENT_FROM_TITLE}
                </Form.Label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  placeholderText={CAR_RESERVATION_DATE_FROM}
                  style={{ marginRight: "10px" }}
                  className="date-picker-style form-reservation"
                  selected={newEvent.start}
                  disabled={action ? true : false}
                  onChange={SubmitStartDate}
                  name="dateFrom"
                  locale={language}
                />
                {startDateMsg ? (
                  <p className="docTypeMessage-style">{startDateMsg}</p>
                ) : null}
              </Col>

              <Col md={2} xs={4}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_TIME_TITLE}
                </Form.Label>
                {!action ? (
                  <TimePickerComponent
                    id="timepicker"
                    placeholder=""
                    format="HH:mm"
                    value={startTimeValue}
                    min={TIME_MIN_VALUE}
                    max={TIME_MAX_VALUE}
                    step={TIME_STEP}
                    onChange={SubmitStartTime}
                  />
                ) : (
                  <Form.Control
                    type="text"
                    className="form-reservation"
                    value={
                      startTimeValue
                        ? startTimeValue.getHours() > 9 &&
                          startTimeValue.getMinutes() > 9
                          ? `${startTimeValue.getHours()} : ${startTimeValue.getMinutes()}`
                          : startTimeValue.getHours() > 9 &&
                            startTimeValue.getMinutes() < 10
                          ? `${startTimeValue.getHours()} : 0${startTimeValue.getMinutes()}`
                          : startTimeValue.getHours() < 10 &&
                            startTimeValue.getMinutes() < 10
                          ? `0${startTimeValue.getHours()} : 0${startTimeValue.getMinutes()}`
                          : `0${startTimeValue.getHours()} : ${startTimeValue.getMinutes()}`
                        : null
                    }
                    disabled
                  ></Form.Control>
                )}

                {selectStartTimeMsg ? (
                  <p className="docTypeMessage-style">{selectStartTimeMsg}</p>
                ) : null}
              </Col>

              <Col md={4} xs={8}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_RENT_TO_TITLE}
                </Form.Label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  placeholderText={CAR_RESERVATION_DATE_TO}
                  selected={newEvent.end}
                  disabled={action ? true : false}
                  style={{ marginRight: "10px" }}
                  className="date-picker-style form-reservation"
                  onChange={SubmitEndDate}
                  name="dateTo"
                  locale={language}
                />
                {endDateMsg ? (
                  <p className="docTypeMessage-style">{endDateMsg}</p>
                ) : null}
              </Col>

              <Col md={2} xs={4}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_TIME_TITLE}
                </Form.Label>
                {!action ? (
                  <TimePickerComponent
                    id="timepicker"
                    placeholder=""
                    format="HH:mm"
                    value={endTimeValue}
                    min={TIME_MIN_VALUE}
                    max={TIME_MAX_VALUE}
                    step={TIME_STEP}
                    onChange={SubmitEndTime}
                  />
                ) : (
                  <Form.Control
                    type="text"
                    className="form-reservation"
                    value={
                      endTimeValue
                        ? endTimeValue.getHours() > 9 &&
                          endTimeValue.getMinutes() > 9
                          ? `${endTimeValue.getHours()} : ${endTimeValue.getMinutes()}`
                          : endTimeValue.getHours() > 9 &&
                            endTimeValue.getMinutes() < 10
                          ? `${endTimeValue.getHours()} : 0${endTimeValue.getMinutes()}`
                          : endTimeValue.getHours() < 10 &&
                            endTimeValue.getMinutes() < 10
                          ? `0${endTimeValue.getHours()} : 0${endTimeValue.getMinutes()}`
                          : `0${endTimeValue.getHours()} : ${endTimeValue.getMinutes()}`
                        : null
                    }
                    disabled
                  ></Form.Control>
                )}

                {selectEndTimeMsg ? (
                  <p className="docTypeMessage-style">{selectEndTimeMsg}</p>
                ) : null}
              </Col>
              {wrongBackDateMsg ? (
                <p className="docTypeMessage-style">{wrongBackDateMsg}</p>
              ) : null}
            </Row>
          </Form.Group>

          <hr />
          <Form.Group controlId="localisation">
            <Row>
              <h5>
                {CAR_RESERVATION_LOCATISATION_SUBTITLE}{" "}
                {locationInfo.short_name}
              </h5>

              <Col md={8} xs={8}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_LOCATION_TITLE}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="location"
                  {...register("location")}
                  onChange={selectlocationHandler}
                  className="form-reservation"
                >
                  <option value={CAR_RESERVATION_OPTION_0} hidden></option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.short_name}
                    </option>
                  ))}
                </Form.Select>
                {location ? <p className="form-msg-style">{location}</p> : null}
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="note">
            <Row>
              <Col md={9} xs={12}>
                <Form.Label className="mt-3">
                  {CAR_RESERVATION_NOTE_TITLE}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="note"
                  {...register("note")}
                  className="form-reservation"
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Button
            type="submit"
            variant="warning"
            className="btn-reservation bg-brown rounded my-3"
          >
            <FontAwesomeIcon icon={faAddressBook} /> {BTN_RESRVATION}
          </Button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default CarReservation;
