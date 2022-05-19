import React from 'react';
import clsx from 'clsx';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Employee Manager</Navbar.Brand>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Button id='employeeBtn'>Employee</Button>

            <Button id='teamBtn'>Team</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
