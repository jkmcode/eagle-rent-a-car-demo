import React from "react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../action/userAction";
import { resetLocations } from "../action/locationAction";
import Logo from "../image/logo.PNG";

import {
  HEADER_LOCATIONS,
  HEADER_RESERVATIONS,
  HEADER_RESERVATIONS_NEW,
  HEADER_RESERVATIONS_SEARCH,
  HEADER_USER_MY_PROFILE,
  HEADER_USER_MY_ADMIN,
  HEADER_USER_MY_LOGOUT,
} from "../constants/EnvConstans";

function Header() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const locationList = useSelector((state) => state.locationList);
  const { locations } = locationList;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetLocations());
  };

  return (
    <Navbar expand="lg" className="bg-navbar" id="navbar">
      <Container container-fluid="true">
        <Navbar.Brand>
          <LinkContainer to="/mainpage">
            <Image src={Logo} className="image-logo" />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mt-1 nav-link-position"
            style={{ maxHeight: "300px" }}
            navbarScroll
          >
            {locations ? (
              <NavDropdown
                title={HEADER_LOCATIONS}
                id="navbarScrollingDropdown"
                className="syling-navlink"
              >
                {locations.map((location) => (
                  <LinkContainer
                    key={location.id}
                    to={`/mainpage/${location.id}/car-list`}
                  >
                    <NavDropdown.Item>{location.short_name}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
            ) : null}

            <NavDropdown
              title={HEADER_RESERVATIONS}
              id="navbarScrollingDropdown"
              className="syling-navlink"
            >
              <LinkContainer to="/search/reservation">
                <NavDropdown.Item>{HEADER_RESERVATIONS_NEW}</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/filter/reservation">
                <NavDropdown.Item>
                  {HEADER_RESERVATIONS_SEARCH}
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Nav style={{ maxHeight: "200px" }} navbarScroll>
            <NavDropdown
              title={userInfo.username}
              id="navbarScrollingDropdown"
              className="syling-navlink"
            >
              <LinkContainer to="/myprofile">
                <NavDropdown.Item>{HEADER_USER_MY_PROFILE}</NavDropdown.Item>
              </LinkContainer>

              {userInfo.IsAdmin && (
                <LinkContainer to="/admin">
                  <NavDropdown.Item>{HEADER_USER_MY_ADMIN}</NavDropdown.Item>
                </LinkContainer>
              )}

              <NavDropdown.Divider />
              <LinkContainer to="/">
                <NavDropdown.Item onClick={logoutHandler}>
                  {HEADER_USER_MY_LOGOUT}
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
