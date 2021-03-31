import React, {useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import bffl from "./smBffl.png"
import AuthService from "../../services/authService";
import "./style.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        {currentUser ? (
          <Navbar.Brand href="/matching">
              <img src={bffl} alt="bffl logo" width="80px"/>
          </Navbar.Brand>
        ) : (
          <Navbar.Brand href="/">
                <img src={bffl} alt="bffl logo" width="80px"/>
          </Navbar.Brand>
        )}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          {currentUser ? (
            <Nav className="mr-auto">
                <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                <Nav.Link href="/login" onClick={logOut}>log out</Nav.Link>
            </Nav>
                ) : (
            <Nav className="mr-auto">
                <Nav.Link href="/login">login</Nav.Link>
                <Nav.Link href="/register">sign up</Nav.Link>
            </Nav>
                )}
          {currentUser && (
            <Nav className="ml-auto">
              <Nav.Link href="/user">account</Nav.Link>
              <Nav.Link href="/matching">start swiping</Nav.Link>
              <Nav.Link href="/chat">chat</Nav.Link>
              <Nav.Link href="/matches">matches</Nav.Link>
            </Nav>
            )}
        </Navbar.Collapse>
    </Navbar>
  );
}


export default Header;