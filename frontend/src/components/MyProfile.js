import React, { useState, useEffect } from "react";
import Header from "./Header";
import FormContainer from "./FormContainer";
import BackLogin from "./BackToLogin";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { getUserDetails, updateUserProfile } from "../action/userAction";
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from "../constants/UserConstants";

import {
  MY_PROFILE_TITLE,
  MY_PROFILE_USERNAME_TITLE,
  MY_PROFILE_EMAIL_TITLE,
  MY_PROFILE_PASSWORD_TITLE,
  MY_PROFILE_CONFIRM_PASSWORD_TITLE,
  MY_PROFILE_USERNAME_PLACEHOLDER,
  MY_PROFILE_EMAIL_PLACEHOLDER,
  MY_PROFILE_PASSWORD_PLACEHOLDER,
  MY_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER,
  MY_PROFILE_USERNAME_REQUIRED,
  MY_PROFILE_USERNAME_MIN_LENGTH,
  MY_PROFILE_USERNAME_PATTERN,
  MY_PROFILE_EMAIL_PATTERN,
  MY_PROFILE_PASSWORD_REQUIRED,
  MY_PROFILE_PASSWORD_MIN_LENGTH,
  MY_PROFILE_CONFIRM_PASSWORD_REQUIRED,
  MY_PROFILE_CONFIRM_PASSWORD_MIN_LENGTH,
  REQUEST_FAILED_WITH_STATUS_CODE_500,
  REQUEST_FAILED_WITH_STATUS_CODE_500_PL,
  REQUEST_FAILED_REST_OF_STATUS_CODE,
  REQUEST_FAIL_WITH_STATUS_CODE_404,
  REQUEST_FAIL_WITH_STATUS_CODE_404_PL,
  MY_PROFILE_SUCCESS_MSG,
  MY_PROFILE_PASSWORD_ARE_NOT_THE_SAME,
  BTN_SAVE,
} from "../constants/EnvConstans";

function MyProfile() {
  const navigate = useNavigate();
  const [messagePassword, setMessagePassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [messageDetails, setMessageDetails] = useState("");
  const [errorUserUpdate, setErrorUserUpdate] = useState(false);
  const [successMsgUpdate, setSuccessMsgUpdate] = useState("");
  const [errorMsgInfo, setErrorMsgInfo] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { errorDetailsFail, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const preloadedValues = {
    name: "name",
    email: "email",
  };

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success,
    errorProfileFail,
    msgSuccess,
    loading: updateLoading,
  } = userUpdateProfile;

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm({ defaultValues: preloadedValues });

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        if (errorDetailsFail === REQUEST_FAILED_WITH_STATUS_CODE_500) {
          setMessageDetails(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
        } else {
          setMessageDetails(REQUEST_FAILED_REST_OF_STATUS_CODE);
        }
        if (errorDetailsFail) {
          dispatch({ type: USER_UPDATE_PROFILE_RESET });
          let timeout = setTimeout(() => {
            navigate("/mainpage");
          }, 5000);
          return () => clearTimeout(timeout);
        }
      } else {
        reset({ name: user.username, email: user.email });
      }
    }
  }, [
    dispatch,
    reset,
    userInfo,
    success,
    user,
    messagePassword,
    passwordConfirm,
  ]);

  const submitHandler = (data) => {
    if (data.password != data.passwordConfirm) {
      setPasswordConfirm(MY_PROFILE_PASSWORD_ARE_NOT_THE_SAME);
      reset({ password: "", passwordConfirm: "" });
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name: data.name,
          email: data.email,
          password: data.password,
        })
      );
      reset({ password: "", passwordConfirm: "" });
    }
  };

  useEffect(() => {
    if (success) {
      setSuccessMsgUpdate(MY_PROFILE_SUCCESS_MSG);
    }

    if (errorProfileFail) {
      if (errorProfileFail === REQUEST_FAILED_WITH_STATUS_CODE_500) {
        setMessagePassword(REQUEST_FAILED_WITH_STATUS_CODE_500_PL);
      } else if (errorProfileFail === REQUEST_FAIL_WITH_STATUS_CODE_404) {
        setMessagePassword(REQUEST_FAIL_WITH_STATUS_CODE_404_PL);
      } else {
        setMessagePassword(REQUEST_FAILED_REST_OF_STATUS_CODE);
      }
    }
  }, [errorProfileFail, success]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messagePassword) {
        navigate("/mainpage");
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }

      if (passwordConfirm) {
        setPasswordConfirm("");
      }

      if (successMsgUpdate) {
        navigate("/mainpage");
        setSuccessMsgUpdate("");
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [messagePassword, passwordConfirm, successMsgUpdate]);

  return (
    <main>
      <BackLogin />
      <Header />
      <FormContainer>
        {loading ? (
          <Loader />
        ) : errorDetailsFail ? (
          <Message variant="danger">{messageDetails}</Message>
        ) : updateLoading ? (
          <Loader />
        ) : (
          <div>
            {successMsgUpdate && (
              <Message variant="success">{successMsgUpdate}</Message>
            )}
            {messagePassword && (
              <Message variant="danger">{messagePassword}</Message>
            )}
            {passwordConfirm && (
              <Message variant="danger">{passwordConfirm}</Message>
            )}
            <h2>{MY_PROFILE_TITLE}</h2>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group controlId="name">
                <Form.Label>{MY_PROFILE_USERNAME_TITLE}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={MY_PROFILE_USERNAME_PLACEHOLDER}
                  disabled
                  {...register("name", {
                    required: MY_PROFILE_USERNAME_REQUIRED,
                    pattern: {
                      value: /[A-Za-z -]/,
                      message: MY_PROFILE_USERNAME_PATTERN,
                    },
                    minLength: {
                      value: 2,
                      message: MY_PROFILE_USERNAME_MIN_LENGTH,
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
                <Form.Label>{MY_PROFILE_EMAIL_TITLE}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={MY_PROFILE_EMAIL_PLACEHOLDER}
                  disabled
                  {...register("email", {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: MY_PROFILE_EMAIL_PATTERN,
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
                <Form.Label>{MY_PROFILE_PASSWORD_TITLE}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={MY_PROFILE_PASSWORD_PLACEHOLDER}
                  {...register("password", {
                    required: MY_PROFILE_PASSWORD_REQUIRED,
                    minLength: {
                      value: 8,
                      message: MY_PROFILE_PASSWORD_MIN_LENGTH,
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                  name="password"
                ></Form.Control>
                {errors.password && (
                  <div className="form-msg-style">
                    {errors.password.message}
                  </div>
                )}
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>{MY_PROFILE_CONFIRM_PASSWORD_TITLE}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={MY_PROFILE_CONFIRM_PASSWORD_PLACEHOLDER}
                  {...register("passwordConfirm", {
                    required: MY_PROFILE_CONFIRM_PASSWORD_REQUIRED,
                    minLength: {
                      value: 8,
                      message: MY_PROFILE_CONFIRM_PASSWORD_MIN_LENGTH,
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
          </div>
        )}
      </FormContainer>
    </main>
  );
}

export default MyProfile;
