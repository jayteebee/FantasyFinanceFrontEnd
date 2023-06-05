import React from 'react'
import { Link } from'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
  return (
    <div>
    
        <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
    <Navbar.Brand href="/">Fantasy Finance</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
            <Nav.Link href="/">Portfolio</Nav.Link>

            <Nav.Link href="/Holding">Holdings</Nav.Link>

          
            <Nav.Link href="/Stocks">Stocks</Nav.Link>
           
            <Nav.Link href="/Profile">Profile</Nav.Link>
            
            <Nav.Link href="/Watchlist">Watch Lists</Nav.Link>
            
            <Nav.Link href="/login">Sign Up / Sign In</Nav.Link>

            </Nav>
            </Navbar.Collapse>
</Container>
        </Navbar>
    
    </div>
  )
}

export default Navigation