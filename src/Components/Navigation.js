import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Balance from "../Components/Funding/Balance";
import { useNavigate } from "react-router-dom";
import { deleteUser } from '../API/userAPI'


const Navigation = ({ updatedBalance, setUpdatedBalance, setShowRegister }) => {
  const userID = window.localStorage.getItem("userID")

  const navigate = useNavigate();


  const logOut = async () => {
    try {
  await deleteUser(userID)
  navigate("/login");
  setUpdatedBalance((prevState) => !prevState);
  setShowRegister(true)
  } catch (error) {
    console.error("Log out failed", error);
  }
};

  return (
    <div>
    {userID ? (<Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Fantasy Finance</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: "#fbbf24" }}>
                Portfolio
              </Nav.Link>

              <Nav.Link href="/Holding" style={{ color: "#fbbf24" }}>
                Holdings
              </Nav.Link>

              <Nav.Link href="/Stocks" style={{ color: "#fbbf24" }}>
                Stocks
              </Nav.Link>

              <Nav.Link href="/Watchlist" style={{ color: "#fbbf24" }}>
                Watchlists And Analysis
              </Nav.Link>

              
            </Nav>
            <Nav>
              <Balance
                setUpdatedBalance={setUpdatedBalance}
                updatedBalance={updatedBalance}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <NavDropdown title="Manage Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/Profile">
                  Account Details
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logOut} >Log Out</NavDropdown.Item>
              
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>) : null}
      
    </div>
  );
};

export default Navigation;
