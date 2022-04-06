import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import Admin from "./components/Admin";
import CreateUser from "./components/CreateUser";
import UsersList from "./components/UsersList";
import UserEdit from "./components/UserEdit";
import Localisation from "./components/Localisation";
import NewLocation from "./components/NewLocation";
import LocationEdit from "./components/LocationEdit";

import CarsAdmin from "./components/CarsAdmin";
import CarsCreate from "./components/CarsCreate";
import CarsEdit from "./components/CarsEdit";
import CarShow from "./components/CarShow";
import CarLocationList from "./components/CarLocationList";
import CarReservation from "./components/CarReservation";
import CarEditReservation from "./components/CarEditReservation";
import CarRent from "./components/CarRent";
import CarRentEdit from "./components/CarRentEdit";
import CarPickUp from "./components/CarPickUp";
import CarSingleEditReservation from "./components/CarSingleEditReservation";
import SearchReservation from "./components/SearchReservation";
import FilterReservation from "./components/FilterReservation";

import UploadImage from "./components/UploadImage";
import ReservationCalendar from "./components/ReservationCalendar";
import UploadImageLocation from "./components/UploadImageLocation";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/mainpage" element={<MainPage />}></Route>
        <Route exact path="/myprofile" element={<MyProfile />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>
        <Route exact path="/admin/createuser" element={<CreateUser />}></Route>
        <Route exact path="/admin/userslist" element={<UsersList />}></Route>
        <Route exact path="/admin/user/:id/edit" element={<UserEdit />} />

        <Route
          exact
          path="/admin/localisation"
          element={<Localisation />}
        ></Route>
        <Route
          exact
          path="/admin/createlocation"
          element={<NewLocation />}
        ></Route>
        <Route
          exact
          path="/admin/location/:id/edit"
          element={<LocationEdit />}
        ></Route>

        <Route exact path="/admin/cars" element={<CarsAdmin />}></Route>
        <Route exact path="/admin/createcars" element={<CarsCreate />}></Route>
        <Route exact path="/admin/car/:id/edit" element={<CarsEdit />}></Route>

        <Route exact path="/car/:id/show" element={<CarShow />}></Route>
        <Route
          exact
          path="/car/:id/show/:idLocation"
          element={<CarShow />}
        ></Route>
        <Route
          exact
          path="/car/:id/show/:action/:idLocation"
          element={<CarShow />}
        ></Route>
        <Route
          exact
          path="/car/:id/show/:action/:idLocation/id-res/:idRes"
          element={<CarShow />}
        ></Route>
        <Route
          exact
          path="/car/:id/show/:action/:idLocation/id-rent/:idRent"
          element={<CarShow />}
        ></Route>
        <Route
          exact
          path="/car/:id/show/rent/:idLocation/:action"
          element={<CarShow />}
        ></Route>
        <Route
          exact
          path="/car/:id/show/:action/:idRes/:idLocation"
          element={<CarShow />}
        ></Route>
        <Route
          exact
          path="/car/:id/show/:action/"
          element={<CarShow />}
        ></Route>

        <Route
          exact
          path="/search/reservation/"
          element={<SearchReservation />}
        ></Route>
        <Route
          exact
          path="/search/reservation/:action/"
          element={<SearchReservation />}
        ></Route>

        <Route
          exact
          path="/filter/reservation/"
          element={<FilterReservation />}
        ></Route>

        <Route
          exact
          path="/car/:id/reservation/id-location/:idLocation"
          element={<CarReservation />}
        ></Route>
        <Route
          exact
          path="/car/:id/reservation/id-location/:idLocation/:action"
          element={<CarReservation />}
        ></Route>

        <Route
          exact
          path="/car/:id/:idLocation/edit-reservation"
          element={<CarEditReservation />}
        ></Route>

        <Route
          exact
          path="/car/:id/rent/:idLocation"
          element={<CarRent />}
        ></Route>
        <Route
          exact
          path="/car/:id/rent/:idLocation/:action/:idRes"
          element={<CarRent />}
        ></Route>

        <Route
          exact
          path="/car/:id/rent/edit/:idRent/location/:idLocation"
          element={<CarRentEdit />}
        ></Route>
        <Route
          exact
          path="/car/:id/pick-up/:idLocation"
          element={<CarPickUp />}
        ></Route>

        <Route
          exact
          path="/reservation/car/:idLocation/:carId/:action/:id"
          element={<CarSingleEditReservation />}
        ></Route>

        <Route
          exact
          path="/mainpage/:id/car-list"
          element={<CarLocationList />}
        ></Route>

        <Route
          exact
          path="/upload-image/:id/"
          element={<UploadImage />}
        ></Route>
        <Route
          exact
          path="/upload-image/:id/location/"
          element={<UploadImageLocation />}
        ></Route>
        <Route
          exact
          path="/reservation-calendar"
          element={<ReservationCalendar />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
