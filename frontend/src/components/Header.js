import React,{ useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../action/userAction'; 
import { resetLocations } from '../action/locationAction';
import Logo from '../image/logo.PNG'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const locationList = useSelector(state => state.locationList)
    const { locations } = locationList

    const logoutHandler = () =>{
        dispatch(logout())
        dispatch(resetLocations())
    }
    //href="/mainpage"

    return (
        <Navbar expand="lg" className='bg-navbar' id='navbar'>
        <Container container-fluid="true">
            <Navbar.Brand>
                <LinkContainer to="/mainpage">
                    <Image src = {Logo} className='image-logo'/>
                </LinkContainer>
            </Navbar.Brand>
            <LinkContainer to="/mainpage"> 
                <Navbar.Brand href="/mainpage">{userInfo.username}</Navbar.Brand>
            </LinkContainer> 
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mt-1 nav-link-position"
                    style={{ maxHeight: '150px'}}
                    navbarScroll
                >
                    <LinkContainer to="/mainpage"> 
                        <Nav.Link className='syling-navlink'>Home</Nav.Link>    
                    </LinkContainer>   

                    <NavDropdown title="User" id="navbarScrollingDropdown" className='syling-navlink'>
                        <LinkContainer to="/myprofile"> 
                            <NavDropdown.Item>Mój profil</NavDropdown.Item>
                        </LinkContainer>

                        {userInfo.IsAdmin &&  (
                            <LinkContainer to="/admin"> 
                                <NavDropdown.Item >Admin</NavDropdown.Item>
                            </LinkContainer>
                        )}

                        <NavDropdown.Divider />
                        <LinkContainer to="/"> 
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </LinkContainer> 
                    </NavDropdown>

                    <NavDropdown title="Lokalizacje" id="navbarScrollingDropdown" className='syling-navlink'>
                        {locations.map(location => (
                            <LinkContainer  
                                key={location.id} 
                                to= {`/mainpage/${location.id}/car-list`}
                            > 
                                <NavDropdown.Item>{location.short_name}</NavDropdown.Item>
                            </LinkContainer>
                        ))}
                    </NavDropdown>

                    <LinkContainer to="/search/reservation"> 
                        <Nav.Link className='syling-navlink'>Rezerwacja</Nav.Link>    
                    </LinkContainer>  
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header
