import React, { useState, useEffect } from "react";
import LoginContainer from "./LoginContainer";
import Loader from "./Loader";
import Message from "./Message";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../action/userAction";
import { listLocation } from "../action/locationAction";

import {
  LOGIN_TITLE,
  LOGIN_SUBTITLE,
  LOGIN_USER_NAME_TITLE,
  LOGIN_PASSWORD,
  LOGIN_USER_NAME_PLACEHOLDER,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_USER_NAME_REQUIRED,
  LOGIN_USER_NAME_MIN_LENGTH,
  LOGIN_USER_NAME_PATTERN,
  LOGIN_PASSWORD_REQUIRED,
  LOGIN_PASSWORD_MIN_LENGTH,
  SUBMIT_BTN,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  WRONG_CREDENTIALS,
  WRONG_CREDENTIALS_PL,
  REQUEST_FAIL_WITH_STATUS_CODE_404,
  REQUEST_FAIL_WITH_STATUS_CODE_404_PL,
  MAX_TIME_LOGOUT,
} from "../constants/EnvConstans";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, userDateLogin } = userLogin;

  useEffect(() => {
    setErrorMsg(error);
    if (error === REQUEST_FAIL_WITH_STATUS_CODE_404) {
      setErrorMsg(REQUEST_FAIL_WITH_STATUS_CODE_404_PL);
    } else if (error === REQUEST_FAILED_WITH_STATUS_CODE_500) {
      setErrorMsg(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
    } else if (error === WRONG_CREDENTIALS) {
      setErrorMsg(WRONG_CREDENTIALS_PL);
    } else {
      setErrorMsg(error);
    }
  }, [error]);

  const today = new Date().valueOf();
  const converDate = Date.parse(userDateLogin);

  useEffect(() => {
    if (userInfo) {
      if (converDate + MAX_TIME_LOGOUT < today) {
        navigate("/");
      } else {
        dispatch(listLocation());
        navigate("/mainpage");
      }
    }
  }, [dispatch, navigate, today, userInfo, userDateLogin, converDate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data.userName, data.password));
    reset();
  };

  return (
    <div className="m-3">
      <LoginContainer>
        {loading && <Loader />}
        {errorMsg && <Message variant="danger">{errorMsg}</Message>}
        <h2>{LOGIN_TITLE}</h2>
        <h4>{LOGIN_SUBTITLE}</h4>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="userName">
            <Form.Label>{LOGIN_USER_NAME_TITLE}</Form.Label>
            <Form.Control
              type="text"
              placeholder={LOGIN_USER_NAME_PLACEHOLDER}
              {...register("userName", {
                required: LOGIN_USER_NAME_REQUIRED,
                minLength: {
                  value: 2,
                  message: LOGIN_USER_NAME_MIN_LENGTH,
                },
                pattern: {
                  value: /[A-Za-z -]/,
                  message: LOGIN_USER_NAME_PATTERN,
                },
              })}
              onKeyUp={() => {
                trigger("userName");
              }}
              name="userName"
            ></Form.Control>
            {errors.userName && (
              <div className="form-msg-style">{errors.userName.message}</div>
            )}
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>{LOGIN_PASSWORD}</Form.Label>
            <Form.Control
              type="password"
              placeholder={LOGIN_PASSWORD_PLACEHOLDER}
              {...register("password", {
                required: LOGIN_PASSWORD_REQUIRED,
                minLength: {
                  value: 8,
                  message: LOGIN_PASSWORD_MIN_LENGTH,
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

          <Button type="submit" variant="primary" className="mt-1">
            {SUBMIT_BTN}
          </Button>
        </Form>
      </LoginContainer>
    </div>
  );
}

export default Login;
