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
import { scroller } from "react-scroll";
import "../App.css";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

import {
  getCarSingleReservation,
  updateCarReservation,
} from "../action/carsAction";
import { getLocationDetails } from "../action/locationAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAddressBook,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import { CAR_SINGLE_EDIT_RESERVATION_RESET } from "../constants/CarsConstans";

import {
  CAR_SINGLE_EDIT_RESERVATION_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_CUSTOMER_NAME_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_TYPE_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_NO_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_EMAIL_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_RENT_FROM_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_RENT_TO_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_TIME_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_REGISTRATION_NO,
  CAR_SINGLE_EDIT_RESERVATION_LOCATISATION_SUBTITLE,
  CAR_SINGLE_EDIT_RESERVATION_SUBTITLE,
  CAR_SINGLE_EDIT_RESERVATION_ADDITIONAL_INFO_TITLE,
  CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_MSG,
  CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_VALUE,
  CAR_SINGLE_EDIT_RESERVATION_REQUIRED_CLIENT_NAME,
  CAR_SINGLE_EDIT_RESERVATION_SELECT_FROM_THE_LIST,
  CAR_SINGLE_EDIT_RESERVATION_DOCUMENT_NO_REQUIRED,
  CAR_SINGLE_EDIT_RESERVATION_INPROPER_PHONE_NO,
  CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_REQUIRED,
  CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_MSG,
  CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_VALUE,
  CAR_SINGLE_EDIT_RESERVATION_INPROPER_EMAIL,
  CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED,
  CAR_SINGLE_EDIT_RESERVATION_REQUIRED_LOCATION,
  CAR_SINGLE_EDIT_RESERVATION_OPTION_0,
  CAR_SINGLE_EDIT_RESERVATION_OPTION_PASSPORT,
  CAR_SINGLE_EDIT_RESERVATION_OPTION_ID,
  CAR_SINGLE_EDIT_RESERVATION_OPTION_DRIVING_LICENSE,
  CAR_SINGLE_EDIT_RESERVATION_OPTION_OTHER,
  CAR_SINGLE_EDIT_RESERVATION_NO_CUSTOMER_NAME,
  CAR_SINGLE_EDIT_RESERVATION_DATE_FROM,
  CAR_SINGLE_EDIT_RESERVATION_DATE_TO,
  CAR_SINGLE_EDIT_RESERVATION_BUTTON_NAME,
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
  MIN_DURATION,
  MIN_DURATION_MSG,
  SET_DATE_TIME_RESERVATION_MSG,
  TIME_STEP,
  TIME_MIN_VALUE,
  TIME_MAX_VALUE,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  SUCCESS_MESSAGE_EDIT_RESERVATION,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  TIME_CLEAR_MSG,
  TRANSFER_TIME,
  OPTION_0,
  SUCCESS_EDIT_RESERVATION,
  BTN_CALENDAR,
  BTN_BACK,
} from "../constants/EnvConstans";

import "react-datepicker/dist/react-datepicker.css";
import { pl } from "date-fns/locale";

function CarSingleEditReservation() {
  const params = useParams();
  const ReservationId = params.id;
  const carId = params.carId;
  const locationId = params.idLocation;
  const action = params.action;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  registerLocale("pl", pl);
  const [language, setLanguage] = useState("pl");

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  // Fetching data from Redux
  const locationList = useSelector((state) => state.locationList);
  const { locations } = locationList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carSingleReservation = useSelector(
    (state) => state.carSingleReservation
  );
  const { loading, reservation, error } = carSingleReservation;

  const carUpdateReservation = useSelector(
    (state) => state.carUpdateReservation
  );
  const {
    success,
    error: errorUpdate,
    reservation: reservationUpdate,
  } = carUpdateReservation;

  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  const locationDetails = useSelector((state) => state.locationDetails);
  const { errorDetailsFail, location: locationInfo } = locationDetails;

  const [clientNameMsg, setClientNameMsg] = useState("");
  const [docTypeMessage, setDocTypeMessage] = useState("");
  const [nrDocMsg, setNrDocMsg] = useState("");
  const [phoneNrMsg, setPhoneNrMsg] = useState("");

  const [newEvent, setNewEvent] = useState({ start: "", end: "" });
  const [startDateMsg, setStartDateMsg] = useState("");
  const [wrongBackDateMsg, setWrongBackDateMsg] = useState("");

  const [endDateMsg, setEndDateMsg] = useState("");
  const [selectStartTimeMsg, setSelectStartTimeMsg] = useState("");
  const [selectEndTimeMsg, setSelectEndTimeMsg] = useState("");
  const [getEndTimeHoursAndMinutes, setEndTimeGetHoursAndMinutes] =
    useState("");
  const [getStartTimeHoursAndMinutes, setStartTimeGetHoursAndMinutes] =
    useState("");
  const [startTimeValue, setStartTimeValue] = useState("");
  const [endTimeValue, setEndTimeValue] = useState("");
  const [location, setLocation] = useState("");

  //Variables for error handling
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectHandler = () => {
    setDocTypeMessage("");
  };

  const submitHandler = (data) => {
    scroller.scrollTo("navbar", { smooth: true, offset: -90, duration: 10 });

    let startDateTimeCombiner = newEvent.start;
    let endDateTimeCombiner = newEvent.end;

    if (data.name) {
      setClientNameMsg("");
    } else {
      setClientNameMsg(CAR_SINGLE_EDIT_RESERVATION_REQUIRED_CLIENT_NAME);
    }

    if (data.documentType === OPTION_0) {
      setDocTypeMessage(CAR_SINGLE_EDIT_RESERVATION_SELECT_FROM_THE_LIST);
    }

    if (data.IdNumber) {
      setNrDocMsg("");
    } else {
      setNrDocMsg(CAR_SINGLE_EDIT_RESERVATION_DOCUMENT_NO_REQUIRED);
    }

    if (data.phone) {
      setPhoneNrMsg("");
    } else {
      setPhoneNrMsg(CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_REQUIRED);
    }

    if (getStartTimeHoursAndMinutes) {
      if (startDateTimeCombiner) {
        startDateTimeCombiner.setHours(getStartTimeHoursAndMinutes.getHours());
        startDateTimeCombiner.setMinutes(
          getStartTimeHoursAndMinutes.getMinutes()
        );
      }
    } else {
      setSelectStartTimeMsg(CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED);
    }

    if (getEndTimeHoursAndMinutes) {
      if (endDateTimeCombiner) {
        endDateTimeCombiner.setHours(getEndTimeHoursAndMinutes.getHours());
        endDateTimeCombiner.setMinutes(getEndTimeHoursAndMinutes.getMinutes());
      }
    } else {
      setSelectEndTimeMsg(CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED);
    }

    if (!startDateTimeCombiner) {
      setStartDateMsg(CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED);
    } else if (
      startDateTimeCombiner.valueOf() <
      new Date().valueOf() + SET_DATE_TIME_RESERVATION
    ) {
      setStartDateMsg(SET_DATE_TIME_RESERVATION_MSG);
    }

    if (!endDateTimeCombiner) {
      setEndDateMsg(CAR_SINGLE_EDIT_RESERVATION_DATE_AND_TIME_REQUIRED);
    } else if (endDateTimeCombiner - MIN_DURATION < startDateTimeCombiner) {
      setWrongBackDateMsg(MIN_DURATION_MSG);
    }

    if (data.location === CAR_SINGLE_EDIT_RESERVATION_OPTION_0) {
      setLocation(CAR_SINGLE_EDIT_RESERVATION_REQUIRED_LOCATION);
    }

    if (
      data.name &&
      data.IdNumber &&
      data.phone &&
      getStartTimeHoursAndMinutes &&
      getEndTimeHoursAndMinutes &&
      startDateTimeCombiner &&
      endDateTimeCombiner &&
      startDateTimeCombiner >
        new Date().valueOf() + SET_DATE_TIME_RESERVATION &&
      endDateTimeCombiner - MIN_DURATION > startDateTimeCombiner &&
      data.documentType !== OPTION_0 &&
      data.location !== CAR_SINGLE_EDIT_RESERVATION_OPTION_0
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
        updateCarReservation({
          id: ReservationId,
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
          type: "Update",
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
    let getStartTime = time.nativeEvent.text;
    setStartTimeGetHoursAndMinutes(getStartTime);
    setSelectStartTimeMsg("");
    setWrongBackDateMsg("");
    setStartDateMsg("");
  };

  const SubmitEndTime = (time) => {
    let getEndTime = time.nativeEvent.text;
    setEndTimeGetHoursAndMinutes(getEndTime);
    setSelectEndTimeMsg("");
    setWrongBackDateMsg("");
  };

  //UseEffect - fetch data from database and fill form, set up dafault time
  useEffect(() => {
    scroller.scrollTo("navbar", { smooth: true, offset: -90, duration: 10 });
    if (!error) {
      if (
        !reservation.client_name ||
        reservation.id !== Number(ReservationId)
      ) {
        dispatch(getCarSingleReservation(ReservationId));
      } else {
        reset({
          name: reservation.client_name,
          documentType: reservation.client_document_type,
          IdNumber: reservation.client_document_identification,
          phone: reservation.client_phone,
          email: reservation.client_email,
          note: reservation.note,
        });

        setNewEvent({
          ...newEvent,
          start: new Date(
            `${reservation.start_year}-${reservation.start_month}-${reservation.start_day}`
          ),
          end: new Date(
            `${reservation.end_year}-${reservation.end_month}-${reservation.end_day}`
          ),
        });

        if (!getEndTimeHoursAndMinutes) {
          setEndTimeValue(
            new Date(
              `01/02/2021 ${reservation.end_hour}:${reservation.end_minute}`
            )
          );
          setEndTimeGetHoursAndMinutes(endTimeValue);
        }
        if (!getStartTimeHoursAndMinutes) {
          setStartTimeValue(
            new Date(
              `01/02/2021 ${reservation.start_hour}:${reservation.start_minute}`
            )
          );
          setStartTimeGetHoursAndMinutes(startTimeValue);
        }
      }
    }

    if (!errorDetailsFail) {
      if (!locationInfo.name || locationInfo.id !== Number(locationId)) {
        dispatch(getLocationDetails(locationId));
      }
    }
  }, [
    ReservationId,
    reservation,
    endTimeValue,
    startTimeValue,
    locationId,
    locationInfo,
  ]);

  //UseEffect - Error handling
  useEffect(() => {
    if (errorUpdate) {
      if (errorUpdate == REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
        const timeout = setTimeout(() => {
          dispatch({ type: CAR_SINGLE_EDIT_RESERVATION_RESET });
          setErrorMessage("");
        }, TIME_CLEAR_MSG);
      } else {
        setErrorMessage(REQUEST_FAILED_REST_OF_STATUS_CODE);
        const timeout = setTimeout(() => {
          dispatch({ type: CAR_SINGLE_EDIT_RESERVATION_RESET });
          setErrorMessage("");
        }, TIME_CLEAR_MSG);
      }
    }

    if (reservationUpdate === ERROR_HANDLING_EXIST_RANGE_DATE_EX_1) {
      setErrorMessage(ERROR_HANDLING_EXIST_RANGE_DATE_EX_1_MSG);
    }
    if (reservationUpdate === ERROR_HANDLING_EXIST_RANGE_DATE_EX_2) {
      setErrorMessage(ERROR_HANDLING_EXIST_RANGE_DATE_EX_2_MSG);
    }
    if (reservationUpdate === ERROR_HANDLING_EXIST_RANGE_DATE_EX_3) {
      setErrorMessage(ERROR_HANDLING_EXIST_RANGE_DATE_EX_3_MSG);
    }

    if (reservationUpdate === ERROR_HANDLING_EXIST_RANGE_DATE_EX_4) {
      setErrorMessage(ERROR_HANDLING_EXIST_RANGE_DATE_EX_4_MSG);
    }
    if (reservationUpdate === ERROR_HANDLING_EXIST_RANGE_DATE_EX_5) {
      setErrorMessage(ERROR_HANDLING_EXIST_RANGE_DATE_EX_5_MSG);
    }
    if (reservationUpdate === ERROR_HANDLING_EXIST_RANGE_DATE_EX_6) {
      setErrorMessage(ERROR_HANDLING_EXIST_RANGE_DATE_EX_6_MSG);
    }

    if (reservationUpdate === SUCCESS_EDIT_RESERVATION) {
      setSuccessMessage(SUCCESS_MESSAGE_EDIT_RESERVATION);
      const timeout = setTimeout(() => {
        dispatch({ type: CAR_SINGLE_EDIT_RESERVATION_RESET });
        if (action === "edit-to-do") {
          navigate(`/mainpage/${locationId}/car-list`);
        }
        if (action === "single-edit") {
          navigate(`/car/${carId}/${locationId}/edit-reservation`);
        }
        if (action === "filter-edit") {
          navigate(`/filter/reservation`);
        }
      }, TIME_CLEAR_MSG);
    }
  }, [errorUpdate, reservationUpdate]);

  //Error handling remove content
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
      dispatch({ type: CAR_SINGLE_EDIT_RESERVATION_RESET });
    }, TIME_CLEAR_MSG);

    return () => clearTimeout(timeout);
  }, [errorMessage, successMessage]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {loading && <Loader />}
        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}
        {errorMessage ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : null}
        <Row>
          <Col>
            {reservation.id ? (
              <div>
                <h3>{CAR_SINGLE_EDIT_RESERVATION_TITLE}</h3>
                <Image
                  src={reservation.id_cars.image}
                  className="car-show-img-sizing"
                />
                <h4>{reservation.id_cars.short_name}</h4>
                <h5>
                  {CAR_SINGLE_EDIT_RESERVATION_REGISTRATION_NO}{" "}
                  {reservation.id_cars.code_registration}
                </h5>
                <hr />
              </div>
            ) : null}
          </Col>
          <Col className="btn-position">
            {action === "edit-to-do" ? (
              <LinkContainer to={`/mainpage/${locationId}/car-list`}>
                <Button className="btn-back">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                </Button>
              </LinkContainer>
            ) : null}
            {action === "single-edit" ? (
              <LinkContainer
                to={`/car/${carId}/${locationId}/edit-reservation`}
              >
                <Button className="btn-back">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                </Button>
              </LinkContainer>
            ) : null}
            {action === "filter-edit" ? (
              <LinkContainer to={`/filter/reservation`}>
                <Button className="btn-back">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                </Button>
              </LinkContainer>
            ) : null}
            <LinkContainer
              to={`/car/${carId}/show/${action}/${locationId}/id-res/${ReservationId}`}
            >
              <Button variant="info" className="m-1">
                <FontAwesomeIcon icon={faCalendar} /> {BTN_CALENDAR}
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId="name">
            <Form.Label>
              {CAR_SINGLE_EDIT_RESERVATION_CUSTOMER_NAME_TITLE}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={CAR_SINGLE_EDIT_RESERVATION_NO_CUSTOMER_NAME}
              className="form-reservation"
              {...register("name", {
                minLength: {
                  value: CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_VALUE,
                  message: CAR_SINGLE_EDIT_RESERVATION_MIN_LENGTH_MSG,
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
                  {CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_TYPE_TITLE}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="documentType"
                  {...register("documentType", {
                    required: "Pole wymagane",
                  })}
                  onChange={selectHandler}
                  className="form-reservation"
                >
                  <option
                    value={CAR_SINGLE_EDIT_RESERVATION_OPTION_0}
                    hidden
                  ></option>
                  <option value={CAR_SINGLE_EDIT_RESERVATION_OPTION_PASSPORT}>
                    {CAR_SINGLE_EDIT_RESERVATION_OPTION_PASSPORT}
                  </option>
                  <option value={CAR_SINGLE_EDIT_RESERVATION_OPTION_ID}>
                    {CAR_SINGLE_EDIT_RESERVATION_OPTION_ID}
                  </option>
                  <option
                    value={CAR_SINGLE_EDIT_RESERVATION_OPTION_DRIVING_LICENSE}
                  >
                    {CAR_SINGLE_EDIT_RESERVATION_OPTION_DRIVING_LICENSE}
                  </option>
                  <option value={CAR_SINGLE_EDIT_RESERVATION_OPTION_OTHER}>
                    {CAR_SINGLE_EDIT_RESERVATION_OPTION_OTHER}
                  </option>
                </Form.Select>

                {docTypeMessage ? (
                  <p className="docTypeMessage-style">{docTypeMessage}</p>
                ) : null}
              </Col>

              <Col md={6} xs={12}>
                <Form.Label className="mt-3">
                  {CAR_SINGLE_EDIT_RESERVATION_DUCUMENT_NO_TITLE}
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
                  {CAR_SINGLE_EDIT_RESERVATION_PHONE_NO_TITLE}
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-reservation"
                  {...register("phone", {
                    pattern: {
                      value: /^[+-]?\d*(?:[.,]\d*)?$/,
                      message: CAR_SINGLE_EDIT_RESERVATION_INPROPER_PHONE_NO,
                    },

                    maxLength: {
                      value: CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_VALUE,
                      message: CAR_SINGLE_EDIT_RESERVATION_MAX_LENGTH_MSG,
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
                  {CAR_SINGLE_EDIT_RESERVATION_EMAIL_TITLE}
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-reservation"
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: CAR_SINGLE_EDIT_RESERVATION_INPROPER_EMAIL,
                    },
                  })}
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
                  {CAR_SINGLE_EDIT_RESERVATION_RENT_FROM_TITLE}
                </Form.Label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  placeholderText={CAR_SINGLE_EDIT_RESERVATION_DATE_FROM}
                  style={{ marginRight: "10px" }}
                  className="date-picker-style form-reservation"
                  selected={newEvent.start}
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
                  {CAR_SINGLE_EDIT_RESERVATION_TIME_TITLE}
                </Form.Label>
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
                {selectStartTimeMsg ? (
                  <p className="docTypeMessage-style">{selectStartTimeMsg}</p>
                ) : null}
              </Col>

              <Col md={4} xs={8}>
                <Form.Label className="mt-3">
                  {CAR_SINGLE_EDIT_RESERVATION_RENT_TO_TITLE}
                </Form.Label>
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  autoComplete="off"
                  autocomplete="off"
                  placeholderText={CAR_SINGLE_EDIT_RESERVATION_DATE_TO}
                  selected={newEvent.end}
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
                  {CAR_SINGLE_EDIT_RESERVATION_TIME_TITLE}
                </Form.Label>
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
                {selectEndTimeMsg ? (
                  <p className="docTypeMessage-style">{selectEndTimeMsg}</p>
                ) : null}
              </Col>
            </Row>
            {wrongBackDateMsg ? (
              <p className="docTypeMessage-style">{wrongBackDateMsg}</p>
            ) : null}
          </Form.Group>

          <hr />
          <Form.Group controlId="localisation">
            <Row>
              <h5>
                {CAR_SINGLE_EDIT_RESERVATION_LOCATISATION_SUBTITLE}{" "}
                {locationInfo.short_name}
              </h5>
              <Col md={8} xs={8}>
                <Form.Label className="mt-3">
                  {CAR_SINGLE_EDIT_RESERVATION_SUBTITLE}
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="location"
                  {...register("location")}
                  onChange={selectlocationHandler}
                  className="form-reservation"
                >
                  <option
                    value={CAR_SINGLE_EDIT_RESERVATION_OPTION_0}
                    hidden
                  ></option>
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
                  {CAR_SINGLE_EDIT_RESERVATION_ADDITIONAL_INFO_TITLE}
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
            <FontAwesomeIcon icon={faAddressBook} />{" "}
            {CAR_SINGLE_EDIT_RESERVATION_BUTTON_NAME}
          </Button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default CarSingleEditReservation;
