import React from 'react';
import clsx from 'clsx';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Navbar.module.scss';
import Home from '../../views/Home/Home';
import Team from '../../views/Team/Team';
export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Link to='/' element={<Home />} style={{ textDecoration: 'none' }}>
          <Navbar.Brand>Employee Manager</Navbar.Brand>
        </Link>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Link to='/' element={<Home />}>
              <Button
                id='employeeBtn'
                href='/'
                className={clsx([styles.btnTab])}
                variant='danger'
              >
                Employee
              </Button>
            </Link>
            <Link to='/team' element={<Team />}>
              <Button
                id='teamBtn'
                className={clsx([styles.btnTab])}
                href='/team'
                variant='danger'
              >
                Team
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
