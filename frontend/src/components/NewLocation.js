import React, { useState, useEffect } from "react";
import Header from "./Header";
import FormContainer from "./FormContainer";
import BackLogin from "./BackToLogin";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createLocation,
  createLocatisationUploadImage,
} from "../action/locationAction";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import {
  LOCATION_CREATE_UPLOAD_IMAGE_RESET,
  LOCATION_CREATE_RESET,
  LOCATION_DETAILS_RESET,
} from "../constants/LocationConstans";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

import {
  NEW_LOCATION_TITLE,
  NEW_LOCATION_LOCATION_NAME_TITLE,
  NEW_LOCATION_LOCATION_SHORT_NAME_TITLE,
  NEW_LOCATION_CHOOSE_PICTURE,
  NEW_LOCATION_LOCATION_NAME_PLACEHOLDER,
  NEW_LOCATION_LOCATION_SHORT_NAME_PLACEHOLDER,
  NEW_LOCATION_LOCATION_NAME_REQUIRED,
  NEW_LOCATION_LOCATION_SHORT_NAME_REQUIRED,
  NEW_LOCATION_LOCATION_NAME_MIN_LENGTH,
  NEW_LOCATION_LOCATION_SHORT_NAME_MIN_LENGTH,
  NEW_LOCATION_LOCATION_NAME_PATTERN,
  NEW_LOCATION_LOCATION_SHORT_NAME_PATTERN,
  BTN_SAVE,
  BTN_BACK,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  NAME_ALREADY_EXIST,
  SUCCESS_MESSAGE_EDIT_RESERVATION,
  SUCCESS_LOCATION_ADD,
} from "../constants/EnvConstans";

function NewLocation() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const locationCreate = useSelector((state) => state.locationCreate);
  const { error, loading, success } = locationCreate;

  const locationCreateUploadImage = useSelector(
    (state) => state.locationCreateUploadImage
  );
  const { error: errorUploadImage } = locationCreateUploadImage;

  const [ulopadImage, setUploadImage] = useState("");
  const [selects, setSelects] = useState("");
  const [suppUniqueVar, setSuppUniqueVar] = useState("");

  //Variables for error handling
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageImage, setErrorMessageImage] = useState("");

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    let unique_supp_var = Date.now();
    dispatch(
      createLocation({
        creator: userInfo._id,
        name: data.name,
        shortName: data.shortName,
        image: data.image,
        supp_unique_var: unique_supp_var,
      })
    );

    setFlag(true);
    setSuppUniqueVar(unique_supp_var);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
    setSelects(file);
  };

  const onSubmitExecute = async () => {
    const formData = new FormData();

    formData.append("image", ulopadImage);
    formData.append("suppUniqueVar", suppUniqueVar);

    dispatch(createLocatisationUploadImage(formData));
  };

  //główny UseEffect
  useEffect(() => {
    if (flag) {
      if (!loading) {
        if (!error && ulopadImage) {
          dispatch(onSubmitExecute);
        }
      }
    }
  }, [flag, loading]);

  //UseEffect - kasowanie komunikatów o błędzie
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (successMessage) {
        dispatch({ type: LOCATION_CREATE_RESET });
        dispatch({ type: LOCATION_CREATE_UPLOAD_IMAGE_RESET });
        dispatch({ type: LOCATION_DETAILS_RESET });
        navigate("/admin/localisation");
        reset();
      }

      if (errorUploadImage) {
        dispatch({ type: LOCATION_CREATE_RESET });
        dispatch({ type: LOCATION_CREATE_UPLOAD_IMAGE_RESET });
        dispatch({ type: LOCATION_DETAILS_RESET });
      }

      if (errorMessage) {
        dispatch({ type: LOCATION_CREATE_RESET });
        dispatch({ type: LOCATION_CREATE_UPLOAD_IMAGE_RESET });
        dispatch({ type: LOCATION_DETAILS_RESET });
      }
    }, 7500);

    return () => clearTimeout(timeout);
  }, [successMessage, errorMessageImage, errorMessage]);

  //UseEffect -słownik błędów
  useEffect(() => {
    if (error) {
      if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setErrorMessage(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
        const timeout = setTimeout(() => {
          dispatch({ type: LOCATION_CREATE_RESET });
          setErrorMessage("");
        }, 7500);
      } else if (error === NAME_ALREADY_EXIST) {
        setErrorMessage(error);
        const timeout = setTimeout(() => {
          dispatch({ type: LOCATION_CREATE_RESET });
          setErrorMessage("");
        }, 7500);
      } else {
        setErrorMessage(REQUEST_FAILED_REST_OF_STATUS_CODE);
        const timeout = setTimeout(() => {
          dispatch({ type: LOCATION_CREATE_RESET });
          setErrorMessage("");
        }, 7500);
      }
    }

    if (errorUploadImage) {
      setErrorMessageImage(SUCCESS_MESSAGE_EDIT_RESERVATION);
      dispatch({ type: LOCATION_CREATE_RESET });
      setErrorMessageImage("");
    }
  }, [error, errorUploadImage]);

  //UseEffect - komunikat success
  useEffect(() => {
    if (success) {
      setSuccessMessage(SUCCESS_LOCATION_ADD);
    }
  }, [success]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {success && <Message variant="success">{successMessage}</Message>}
        {errorMessage ? (
          <Message variant="danger">{errorMessage}</Message>
        ) : null}
        {errorUploadImage && (
          <Message variant="danger">{errorMessageImage}</Message>
        )}
        <Row>
          <Col>
            <h2>{NEW_LOCATION_TITLE}</h2>
          </Col>
          <Col className="btn-position">
            <LinkContainer to={`/admin/localisation`}>
              <Button className="btn-md btn-back">
                <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>{NEW_LOCATION_LOCATION_NAME_TITLE}</Form.Label>
            <Form.Control
              type="text"
              placeholder={NEW_LOCATION_LOCATION_NAME_PLACEHOLDER}
              {...register("name", {
                required: NEW_LOCATION_LOCATION_NAME_REQUIRED,
                minLength: {
                  value: 10,
                  message: NEW_LOCATION_LOCATION_NAME_MIN_LENGTH,
                },
                pattern: {
                  value: /[A-Za-z -]/,
                  message: NEW_LOCATION_LOCATION_NAME_PATTERN,
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
            <Form.Label>{NEW_LOCATION_LOCATION_SHORT_NAME_TITLE}</Form.Label>
            <Form.Control
              type="text"
              placeholder={NEW_LOCATION_LOCATION_SHORT_NAME_PLACEHOLDER}
              {...register("shortName", {
                required: NEW_LOCATION_LOCATION_SHORT_NAME_REQUIRED,
                minLength: {
                  value: 2,
                  message: NEW_LOCATION_LOCATION_SHORT_NAME_MIN_LENGTH,
                },
                pattern: {
                  value: /[A-Za-z -]/,
                  message: NEW_LOCATION_LOCATION_SHORT_NAME_PATTERN,
                },
              })}
              onKeyUp={() => {
                trigger("shortName");
              }}
              name="shortName"
            ></Form.Control>
            {errors.shortName && (
              <div className="form-msg-style">{errors.shortName.message}</div>
            )}
          </Form.Group>

          <Form.Group controlId="formFile" className="test-img">
            <Form.Label className="mt-3">
              {NEW_LOCATION_CHOOSE_PICTURE}
            </Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3 bnt-block bg-brown rounded"
          >
            {BTN_SAVE}
          </Button>
        </Form>
      </FormContainer>
    </main>
  );
}

export default NewLocation;
