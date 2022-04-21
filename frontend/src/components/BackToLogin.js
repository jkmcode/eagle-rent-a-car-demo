import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { MAX_TIME_LOGOUT } from "../constants/EnvConstans";

function BackToLogin(props) {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, userDateLogin } = userLogin;

  const today = new Date().valueOf();
  const converDate = Date.parse(userDateLogin);

  useEffect(() => {
    if (userInfo) {
      if (converDate + MAX_TIME_LOGOUT < today) {
        navigate("/");
      }
    }
  }, [converDate, navigate, today, userInfo]);

  return <div></div>;
}

export default BackToLogin;
