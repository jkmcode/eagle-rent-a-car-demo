import React, { useState, useEffect } from "react";
import Header from "./Header";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import Message from "./Message";
import BackLogin from "./BackToLogin";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarDetails, updateCar } from "../action/carsAction";
import { CARS_DETAILS_RESET, CAR_EDIT_RESET } from "../constants/CarsConstans";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

import {
  CARS_EDIT_TITLE,
  CARS_EDIT_CAR_NAME_TITLE,
  CARS_EDIT_CAR_SHORT_NAME_TITLE,
  CARS_EDIT_CAR_REGISTRATION_NO_TITLE,
  CARS_EDIT_CAR_MAIN_LOCATION_TITLE,
  CARS_EDIT_CAR_NEW_MAIN_LOCATION_TITLE,
  CARS_EDIT_CHECKBOX_READY_FOR_RENT,
  CARS_EDIT_CAR_NAME_PLACEHOLDER,
  CARS_EDIT_CAR_SHORT_NAME_PLACEHOLDER,
  CARS_EDIT_CAR_REGISTRATION_NO_PLACEHOLDER,
  CARS_EDIT_CAR_NAME_REQUIRED,
  CARS_EDIT_CAR_NAME_MIN_LENGTH,
  CARS_EDIT_CAR_SHORT_NAME_REQUIRED,
  CARS_EDIT_CAR_SHORT_NAME_MIN_LENGTH,
  CARS_EDIT_CAR_REGISTRATION_NO_REQUIRED,
  CARS_EDIT_CAR_REGISTRATION_MIN_LENGTH,
  CARS_EDIT_CAR_NEW_MAIN_LOCATION_REQUIRED,
  BTN_BACK,
  BTN_CHANGE,
  BTN_ADD_PICTURE,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  REGISTRATION_NO_ALREADY_EXIST,
  SUCCESS_CAR_EDIT,
} from "../constants/EnvConstans";

function CarsEdit() {
  const params = useParams();
  const carId = params.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [locationId, setLocationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const carDetails = useSelector((state) => state.carDetails);
  const { error, loading, car } = carDetails;

  const carEditUlopadImage = useSelector((state) => state.carEditUploadImage);
  const { error: errorEditUploadImage } = carEditUlopadImage;

  const carUpdate = useSelector((state) => state.carUpdate);
  const {
    error: errorCarUpdate,
    loading: loadingCarUpdate,
    car: carEdit,
    success,
  } = carUpdate;

  const locationList = useSelector((state) => state.locationList);
  const { locations } = locationList;

  const [isActive, setIsActive] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  //główny UseEffect
  useEffect(() => {
    if (!error) {
      if (!car.name || car.id !== Number(carId)) {
        dispatch(getCarDetails(carId));
      } else {
        if (car.is_active) {
          setIsActive(true);
        }
        reset({
          name: car.name,
          shortName: car.short_name,
          codeRegistration: car.code_registration,
          mainLocation: car.main_location.short_name,
        });
        setLocationId(car.main_location.id);
      }
    }
  }, [carId, car]);

  //UseEffect -słownik błędów
  useEffect(() => {
    if (error || errorCarUpdate || errorEditUploadImage) {
      if (
        error === REQUEST_FAILED_WITH_STATUS_CODE_500 ||
        errorCarUpdate === REQUEST_FAILED_WITH_STATUS_CODE_500 ||
        errorEditUploadImage === REQUEST_FAILED_WITH_STATUS_CODE_500
      ) {
        setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
      } else if (errorCarUpdate === REGISTRATION_NO_ALREADY_EXIST) {
        setErrorMessage(errorCarUpdate);
      } else {
        setErrorMessage(REQUEST_FAILED_REST_OF_STATUS_CODE);
      }
    }
  }, [error, errorCarUpdate, errorEditUploadImage]);

  //UseEffect - komunikat success
  useEffect(() => {
    if (success) {
      setSuccessMessage(SUCCESS_CAR_EDIT);
    }
  }, [success]);

  //UseEffect - kasowanie komunikatów
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (errorCarUpdate) {
        dispatch({ type: CAR_EDIT_RESET });
      }

      if (successMessage) {
        dispatch({ type: CAR_EDIT_RESET });
        dispatch({ type: CARS_DETAILS_RESET });
        navigate("/admin/cars");
      }
    }, 7500);

    return () => clearTimeout(timeout);
  }, [errorCarUpdate, successMessage]);

  const submitHandler = (data) => {
    if (data.selectLocation === "0") {
      data.selectLocation = locationId;
    }

    dispatch(
      updateCar({
        id: carId,
        name: data.name,
        shortName: data.shortName,
        selectLocation: data.selectLocation,
        codeRegistration: data.codeRegistration,
        isActive: isActive,
        creator: userInfo.id,
        type: "Edit data",
      })
    );
    dispatch({ type: CARS_DETAILS_RESET });
  };

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : errorCarUpdate ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : errorEditUploadImage ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : (
          <article>
            {success && <Message variant="success">{successMessage}</Message>}
            <Row>
              <Col>
                <h2 className="cars-edit-title">{CARS_EDIT_TITLE}</h2>
              </Col>
              <Col className="position-img">
                {car.image ? (
                  <div>
                    <div>
                      <LinkContainer to={`/admin/cars`}>
                        <Button className="btn-back">
                          <FontAwesomeIcon icon={faAngleDoubleLeft} />{" "}
                          {BTN_BACK}
                        </Button>
                      </LinkContainer>
                      <LinkContainer to={`/upload-image/${carId}/`}>
                        <Button className="m-1">{BTN_CHANGE}</Button>
                      </LinkContainer>
                    </div>
                    <div>
                      <Image src={car.image} className="car-edit-img-sizing" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <LinkContainer to={`/admin/cars`}>
                      <Button className="btn-back">
                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
                      </Button>
                    </LinkContainer>

                    <LinkContainer to={`/upload-image/${carId}/`}>
                      <Button className="m-1">{BTN_ADD_PICTURE}</Button>
                    </LinkContainer>
                  </div>
                )}
              </Col>
            </Row>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group controlId="name">
                <Form.Label>{CARS_EDIT_CAR_NAME_TITLE}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={CARS_EDIT_CAR_NAME_PLACEHOLDER}
                  {...register("name", {
                    required: CARS_EDIT_CAR_NAME_REQUIRED,
                    minLength: {
                      value: 10,
                      message: CARS_EDIT_CAR_NAME_MIN_LENGTH,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("name");
                  }}
                  name="name"
                ></Form.Control>
                {errors.name && (
                  <div className="form-msg-style">{errors.name.message}</div>
                )}
              </Form.Group>

              <Form.Group controlId="shortName">
                <Form.Label>{CARS_EDIT_CAR_SHORT_NAME_TITLE}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={CARS_EDIT_CAR_SHORT_NAME_PLACEHOLDER}
                  {...register("shortName", {
                    required: CARS_EDIT_CAR_SHORT_NAME_REQUIRED,
                    minLength: {
                      value: 2,
                      message: CARS_EDIT_CAR_SHORT_NAME_MIN_LENGTH,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("shortName");
                  }}
                  name="shortName"
                ></Form.Control>
                {errors.shortName && (
                  <div className="form-msg-style">
                    {errors.shortName.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="codeRegistration">
                <Form.Label>{CARS_EDIT_CAR_REGISTRATION_NO_TITLE}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={CARS_EDIT_CAR_REGISTRATION_NO_PLACEHOLDER}
                  {...register("codeRegistration", {
                    required: CARS_EDIT_CAR_REGISTRATION_NO_REQUIRED,
                    minLength: {
                      value: 6,
                      message: CARS_EDIT_CAR_REGISTRATION_MIN_LENGTH,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("codeRegistration");
                  }}
                  name="codeRegistration"
                ></Form.Control>
                {errors.codeRegistration && (
                  <div className="form-msg-style">
                    {errors.codeRegistration.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="mainLocation">
                <Row>
                  <Col md={6} xs={12}>
                    <Form.Label className="mt-3">
                      {CARS_EDIT_CAR_MAIN_LOCATION_TITLE}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      {...register("mainLocation")}
                      name="mainLocation"
                    ></Form.Control>
                  </Col>

                  <Col md={6} xs={12}>
                    <Form.Label className="mt-3">
                      {CARS_EDIT_CAR_NEW_MAIN_LOCATION_TITLE}
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("selectLocation", {
                        required: CARS_EDIT_CAR_NEW_MAIN_LOCATION_REQUIRED,
                      })}
                      name="selectLocation"
                      defaultValue={locationId}
                    >
                      <option key="0" value="0" hidden></option>

                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.short_name}
                        </option>
                      ))}
                    </Form.Select>

                    {errors.mainLocation2 && (
                      <div className="form-msg-style">
                        {errors.mainLocation2.message}
                      </div>
                    )}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="isactive" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label={CARS_EDIT_CHECKBOX_READY_FOR_RENT}
                  checked={isActive}
                  name="isactive"
                  onChange={(e) => setIsActive(e.target.checked)}
                ></Form.Check>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="bnt-block bg-brown rounded my-3"
              >
                {BTN_CHANGE}
              </Button>
            </Form>
          </article>
        )}
      </FormContainer>
    </main>
  );
}

export default CarsEdit;
