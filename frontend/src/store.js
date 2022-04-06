import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducers,
  userDetailsReducers,
  userUpdateProfileReducers,
  userCreateReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateReducers,
  dateLoginReducers,
} from "./reducer/userReducer";

import {
  locationListReducers,
  locationCreateReducers,
  locationUpdateReducers,
  locationDetailsReducers,
  locationCreateUploadImageReducers,
} from "./reducer/locationReducer";

import {
  carsListReducers,
  carCreateReducers,
  carDetailsReducers,
  carUpdateReducers,
  carCreateUploadImageReducers,
  carEditUploadImageReducers,
  carsListByLocationReducers,
  carReservationCreateReducers,
  carsListReservationReducers,
  ReservationDeleteReducers,
  carSingleReservationReducer,
  carUpdateReservationReducers,
  carRentCreateReducers,
  carsListRentsReducers,
  carRentDetailsReducers,
  carUpdateRentReducers,
  carEditRentReducers,
  searchReservationsReducers,
  filterReservationsReducers,
} from "./reducer/carsReducer";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  userCreateReducers: userCreateReducers,
  userList: userListReducers,
  userDelete: userDeleteReducers,
  userUpdate: userUpdateReducers,
  dateLogin: dateLoginReducers,

  locationList: locationListReducers,
  locationCreate: locationCreateReducers,
  locationUpdate: locationUpdateReducers,
  locationDetails: locationDetailsReducers,
  locationCreateUploadImage: locationCreateUploadImageReducers,

  carsList: carsListReducers,
  carCreate: carCreateReducers,
  carDetails: carDetailsReducers,
  carUpdate: carUpdateReducers,
  carCreateUploadImage: carCreateUploadImageReducers,
  carEditUploadImage: carEditUploadImageReducers,
  carsListByLocation: carsListByLocationReducers,
  carReservationCreate: carReservationCreateReducers,
  carsListReservation: carsListReservationReducers,
  reservationDelete: ReservationDeleteReducers,
  carSingleReservation: carSingleReservationReducer,
  carUpdateReservation: carUpdateReservationReducers,
  carRentCreate: carRentCreateReducers,
  carsListRents: carsListRentsReducers,
  carRentDetails: carRentDetailsReducers,
  carUpdateRent: carUpdateRentReducers,
  carEditRent: carEditRentReducers,
  searchReservations: searchReservationsReducers,
  filterReservations: filterReservationsReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const dateLoginFromStorage = localStorage.getItem("dateLogin")
  ? JSON.parse(localStorage.getItem("dateLogin"))
  : null;

const listLocationFromStorage = localStorage.getItem("listLocation")
  ? JSON.parse(localStorage.getItem("listLocation"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    userDateLogin: dateLoginFromStorage,
  },
  locationList: { locations: listLocationFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
