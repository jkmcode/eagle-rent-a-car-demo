import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  DATE_LOGIN_REQUEST,
  DATE_LOGIN_SUCCESS,
  DATE_LOGIN_FAIL,
  DATE_LOGOUT,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/UserConstants";

export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        userDateLogin: new Date(),
      };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const dateLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case DATE_LOGIN_REQUEST:
      return { loading: true };

    case DATE_LOGIN_SUCCESS:
      return { loginDate: action.payload, loading: false };

    case DATE_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case DATE_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };

    case USER_CREATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };

    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, errorDetailsFail: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userUpdateProfileReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, msgSuccess: false };

    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        msgSuccess: true,
        userInfo: action.payload,
      };

    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        msgSuccess: false,
        errorProfileFail: action.payload,
      };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userListReducers = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };

    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };

    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case USER_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const userUpdateReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };

    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { user: {} };

    default:
      return state;
  }
};
