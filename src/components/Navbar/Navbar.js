import React from 'react';
import clsx from 'clsx';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Navbar.module.scss';
export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Employee Manager</Navbar.Brand>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Button id='employeeBtn' href='/'>
              Employee
            </Button>
            <Button id='teamBtn' className={clsx([styles.btnTab])}>
              Team
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
