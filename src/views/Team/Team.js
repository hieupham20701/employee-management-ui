import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaRegAddressCard } from 'react-icons/fa';
import { Form, Table, Modal, Button, Col, Row } from 'react-bootstrap';
import styles from './Team.module.scss';
import clsx from 'clsx';
import axios from 'axios';

export default function Team() {
  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [teamDTO, setTeamDTO] = useState({});
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const teamRes = await axios.get(`http://localhost:8087/api/teams`);
    setTeams(teamRes.data);
  };
  const getEmployees = async (event, teamId) => {
    const employeeRes = await axios.get(
      `http://localhost:8087/api/employees/teams?team_id=` + teamId,
    );
    setEmployees(employeeRes.data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const newTeam = {
      name: data.get('name'),
    };
    axios({
      method: 'POST',
      url: 'http://localhost:8087/api/teams/new',
      data: newTeam,
    }).then(function (res) {
      fetchData();
    });
  };

  return (
    <>
      <div>
        <span className={clsx([styles.btnadd])} onClick={handleShow}>
          <FaPlusCircle />
        </span>
        <h4 className={clsx([styles.title])}>Team</h4>
      </div>
      <br></br>
      <hr />
      <Row>
        <Col sm='5'>
          <p className={clsx([styles.title])}>Total Teams: {teams.length}</p>
          <Table>
            <thead>
              <tr>
                <th>No. </th>
                <th>Name Team</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{teams.indexOf(team) + 1}</td>
                  <td>{team.name}</td>
                  <td>
                    <span className={clsx([styles.showTeamDetail])}>
                      <FaRegAddressCard
                        onClick={(event) => getEmployees(event, team.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col sm='7'>
          <p className={clsx([styles.titleResEmployee])}>
            Result all employee team Manager - Total {employees.length}
          </p>
          <Table>
            <thead>
              <tr>
                <th>No. </th>
                <th>Name</th>
                <th>Team</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Sex</th>
              </tr>
            </thead>
            <tbody>
              {employees !== undefined
                ? employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employees.indexOf(employee) + 1}</td>
                      <td>{employee.fullName}</td>
                      <td>{employee.teamDTO.name}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>{employee.address}</td>
                      <td>{employee.sex ? 'Male' : 'Female'}</td>
                    </tr>
                  ))
                : employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employees.indexOf(employee) + 1}</td>
                      <td>{teamDTO.name}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>{employee.address}</td>
                      <td>{employee.sex ? 'Male' : 'Female'}</td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size='lg' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='addTeamForm' method='POST' onSubmit={handleSubmit}>
            <Form.Group controlId='fullNameInput' col='12' className='mb-3'>
              <Form.Label>Team's Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Fill the Name of the Teams'
                name='name'
              ></Form.Control>
            </Form.Group>
            <Button variant='warning' type='submit' onSubmit={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
