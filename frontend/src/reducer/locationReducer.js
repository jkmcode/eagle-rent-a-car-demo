import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  LOCATION_LIST_RESET,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_CREATE_FAIL,
  LOCATION_CREATE_RESET,
  LOCATION_EDIT_REQUEST,
  LOCATION_EDIT_SUCCESS,
  LOCATION_EDIT_FAIL,
  LOCATION_EDIT_RESET,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_SUCCESS,
  LOCATION_DETAILS_FAIL,
  LOCATION_DETAILS_RESET,
  LOCATION_CREATE_UPLOAD_IMAGE_REQUEST,
  LOCATION_CREATE_UPLOAD_IMAGE_SUCCESS,
  LOCATION_CREATE_UPLOAD_IMAGE_FAIL,
  LOCATION_CREATE_UPLOAD_IMAGE_RESET,
} from "../constants/LocationConstans";

export const locationListReducers = (state = { locations: [] }, action) => {
  switch (action.type) {
    case LOCATION_LIST_REQUEST:
      return { loading: true };

    case LOCATION_LIST_SUCCESS:
      return { loading: false, locations: action.payload };

    case LOCATION_LIST_FAIL:
      return { loading: false, error: action.payload };

    case LOCATION_LIST_RESET:
      return { locations: [] };

    default:
      return state;
  }
};

export const locationCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case LOCATION_CREATE_REQUEST:
      return { loading: true };

    case LOCATION_CREATE_SUCCESS:
      return { loading: false, success: true, locations: action.payload };

    case LOCATION_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case LOCATION_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const locationUpdateReducers = (state = { locations: {} }, action) => {
  switch (action.type) {
    case LOCATION_EDIT_REQUEST:
      return { loading: true };

    case LOCATION_EDIT_SUCCESS:
      return { loading: false, success: true };

    case LOCATION_EDIT_FAIL:
      return { loading: false, error: action.payload };

    case LOCATION_EDIT_RESET:
      return { locations: {} };

    default:
      return state;
  }
};

export const locationDetailsReducers = (state = { location: {} }, action) => {
  switch (action.type) {
    case LOCATION_DETAILS_REQUEST:
      return { ...state, loading: true };

    case LOCATION_DETAILS_SUCCESS:
      return { loading: false, success: true, location: action.payload };

    case LOCATION_DETAILS_FAIL:
      return { loading: false, errorDetailsFail: action.payload };

    case LOCATION_DETAILS_RESET:
      return { location: {} };

    default:
      return state;
  }
};

export const locationCreateUploadImageReducers = (state = {}, action) => {
  switch (action.type) {
    case LOCATION_CREATE_UPLOAD_IMAGE_REQUEST:
      return { loading: true };

    case LOCATION_CREATE_UPLOAD_IMAGE_SUCCESS:
      return { loading: false, location: action.payload };

    case LOCATION_CREATE_UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload };

    case LOCATION_CREATE_UPLOAD_IMAGE_RESET:
      return {};

    default:
      return state;
  }
};
