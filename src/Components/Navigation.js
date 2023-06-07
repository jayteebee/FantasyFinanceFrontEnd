import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Balance from "../Components/Funding/Balance";

const Navigation = ({ updatedBalance, setUpdatedBalance }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
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

              <Nav.Link href="/login" style={{ color: "#fbbf24" }}>
                Sign Up / Sign In
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
                <NavDropdown.Item href="/LogOut">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
