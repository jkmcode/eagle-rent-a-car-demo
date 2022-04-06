import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../action/userAction";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Header from "./Header";
import Message from "./Message";
import Loader from "./Loader";
import BackLogin from "./BackToLogin";
import { USER_CREATE_RESET } from "../constants/UserConstants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

import {
  CREATE_USER_TITLE,
  CREATE_USER_NAME_TITLE,
  CREATE_USER_EMAIL_TITLE,
  CREATE_USER_PASSWORD_TITLE,
  CREATE_USER_CONFIRM_PASSWORD_TITLE,
  CREATE_USER_NAME_PLACEHOLDER,
  CREATE_USER_EMAIL_PLACEHOLDER,
  CREATE_USER_PASSWORD_PLACEHOLDER,
  CREATE_USER_CONFIRM_PASSWORD_PLACEHOLDER,
  CREATE_USER_NAME_REQUIRED,
  CREATE_USER_NAME_MIN_LENGTH,
  CREATE_USER_NAME_PATTERN,
  CREATE_USER_EMAIL_PATTERN,
  CREATE_USER_PASSWORD_REQUIRED,
  CREATE_USER_PASSWORD_MIN_LENGTH,
  CREATE_USER_CONFIRM_PASSWORD_REQUIRED,
  CREATE_USER_CONFIRM_PASSWORD_MIN_LENGTH,
  ENTERED_PASSWORD_ARE_NOT_THE_SAME,
  BTN_BACK,
  BTN_SAVE,
} from "../constants/EnvConstans";

function CreateUser() {
  const navigate = useNavigate();

  const [msgEmail, setMsgEmail] = useState(false);
  const [messagePassword, setMessagePassword] = useState("");
  const dispatch = useDispatch();
  const userCreateReducers = useSelector((state) => state.userCreateReducers);
  const {
    error,
    loading,
    userInfo,
    success: successCreateUser,
  } = userCreateReducers;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    if (data.password != data.passwordConfirm) {
      setMessagePassword(ENTERED_PASSWORD_ARE_NOT_THE_SAME);
    } else {
      dispatch(createUser(data.name, data.email, data.password));
      setMsgEmail(true);
    }
    reset();
  };

  useEffect(() => {
    if (successCreateUser) {
      dispatch({ type: USER_CREATE_RESET });
      navigate("/admin/userslist");
    } else {
      const timeout = setTimeout(() => {
        setMsgEmail(false);
        setMessagePassword("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [msgEmail, messagePassword, successCreateUser]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {messagePassword && (
          <Message variant="danger">{messagePassword}</Message>
        )}
        {msgEmail && error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Row>
          <Col>
            <h2>{CREATE_USER_TITLE}</h2>
          </Col>

          <Col className="btn-position">
            <LinkContainer to={`/admin/userslist`}>
              <Button className="btn-md btn-back">
                <FontAwesomeIcon icon={faAngleDoubleLeft} /> {BTN_BACK}
              </Button>
            </LinkContainer>
          </Col>
        </Row>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>{CREATE_USER_NAME_TITLE}</Form.Label>
            <Form.Control
              type="text"
              placeholder={CREATE_USER_NAME_PLACEHOLDER}
              {...register("name", {
                required: CREATE_USER_NAME_REQUIRED,
                minLength: {
                  value: 2,
                  message: CREATE_USER_NAME_MIN_LENGTH,
                },
                pattern: {
                  value: /[A-Za-z -]/,
                  message: CREATE_USER_NAME_PATTERN,
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

          <Form.Group controlId="email">
            <Form.Label>{CREATE_USER_EMAIL_TITLE}</Form.Label>
            <Form.Control
              type="text"
              placeholder={CREATE_USER_EMAIL_PLACEHOLDER}
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: CREATE_USER_EMAIL_PATTERN,
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
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>{CREATE_USER_PASSWORD_TITLE}</Form.Label>
            <Form.Control
              type="password"
              placeholder={CREATE_USER_PASSWORD_PLACEHOLDER}
              {...register("password", {
                required: CREATE_USER_PASSWORD_REQUIRED,
                minLength: {
                  value: 8,
                  message: CREATE_USER_PASSWORD_MIN_LENGTH,
                },
              })}
              onKeyUp={() => {
                trigger("password");
              }}
              name="password"
            ></Form.Control>
            {errors.password && (
              <div className="form-msg-style">{errors.password.message}</div>
            )}
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>{CREATE_USER_CONFIRM_PASSWORD_TITLE}</Form.Label>
            <Form.Control
              type="password"
              placeholder={CREATE_USER_CONFIRM_PASSWORD_PLACEHOLDER}
              {...register("passwordConfirm", {
                required: CREATE_USER_CONFIRM_PASSWORD_REQUIRED,
                minLength: {
                  value: 8,
                  message: CREATE_USER_CONFIRM_PASSWORD_MIN_LENGTH,
                },
              })}
              onKeyUp={() => {
                trigger("passwordConfirm");
              }}
              name="passwordConfirm"
            ></Form.Control>
            {errors.passwordConfirm && (
              <div className="form-msg-style">
                {errors.passwordConfirm.message}
              </div>
            )}
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

export default CreateUser;
