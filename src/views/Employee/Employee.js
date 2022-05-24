import React, { useState, useEffect, useRef } from 'react';
import image from '../../assets/img/default-avatar.png';
import axios from 'axios';
import {
  FaInfo,
  FaTrashAlt,
  FaPlusCircle,
  FaPencilAlt,
  FaEdit,
} from 'react-icons/fa';
import clsx from 'clsx';
import styles from './Employee.module.scss';
import {
  Col,
  Form,
  Row,
  Tab,
  Table,
  Tabs,
  Button,
  Modal,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
export default function Employee() {
  const [showform, setShowForm] = useState(true);
  const [employee, setEmployee] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const employeeRes = await axios.get(
      `http://localhost:8087/api/employees/` + id,
    );
    setEmployee(employeeRes.data);
  };
  console.log(employee);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  const unableForm = () => {
    setShowForm(false);
  };
  return (
    <>
      <span className={clsx([styles.btnDeleteEmployee])}>
        <FaTrashAlt />
      </span>
      <span className={clsx([styles.btnEditEmployee])} onClick={handleShow}>
        <FaEdit />
      </span>
      <h4 className={clsx([styles.txtNameEmployee])}>Name</h4>
      <br />
      <hr></hr>
      <div className={clsx(['row'])}>
        <div className={clsx(['col-4'])}>
          <img className={clsx([styles.avatar])} src={image} />
          <div className={clsx([styles.info])}>
            <span className={clsx([styles.no])}>No: {employee.id}</span>
            <span className={clsx([styles.age])}>Age:{employee.age}</span>
          </div>
          <div className={clsx([styles.info])}>
            <span className={clsx([styles.sex])}>
              Sex: {employee.sex ? 'Male' : 'Female'}
            </span>
          </div>
        </div>
        <div className={clsx(['col-8'])}>
          <Tabs defaultActiveKey={'infomations'}>
            <Tab eventKey='infomations' title='INFOMATIONS'>
              <h4 className={clsx([styles.title])}>INFOMATIONS</h4>
              <Form>
                <Row className={clsx([styles.updform])}>
                  <Col sm='6'>
                    <Form.Control
                      name='startDate'
                      type='date'
                      id='startDate'
                      readOnly={showform}
                    />
                  </Col>
                  <Col sm='6'>
                    <Form.Control
                      name='team'
                      type='text'
                      id='team'
                      value={'Team: ' + employee.teamDTO.name}
                      readOnly={showform}
                    />
                  </Col>
                </Row>
                <Row className={clsx([styles.updform])}>
                  <Col sm='6'>
                    <Form.Control
                      name='address'
                      type='text'
                      id='address'
                      value={'Address: ' + employee.address}
                      readOnly={showform}
                    />
                  </Col>
                  <Col sm='6'>
                    <Form.Control
                      name='salary'
                      type='text'
                      id='salary'
                      value={'Salary per hour: ' + employee.moneyPerHour + '$'}
                      readOnly={showform}
                    />
                  </Col>
                </Row>
              </Form>
            </Tab>
            <Tab eventKey={'workings'} title={'WORKINGS'}>
              <div>
                <span className={clsx([styles.btnAddWorking])}>
                  <FaPlusCircle />
                </span>
                <h4 className={clsx([styles.title])}>WORKING</h4>
              </div>
              <hr></hr>

              <Table striped hover>
                <thead>
                  <tr>
                    <th>No. </th>
                    <th>Date</th>
                    <th>Hour</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>8</td>
                    <td>
                      <span className={clsx([styles.deleteAdvance])}>
                        <FaTrashAlt />
                      </span>{' '}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={'advances'} title={'ADVANCES'}>
              <div>
                <span className={clsx([styles.btnAddWorking])}>
                  <FaPlusCircle />
                </span>
                <h4 className={clsx([styles.title])}>ADVANCES</h4>
              </div>
              <hr></hr>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>No. </th>
                    <th>Date</th>
                    <th>Money</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>8</td>
                    <td>
                      <span className={clsx([styles.deleteAdvance])}>
                        <FaTrashAlt />
                      </span>{' '}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={'statistics'} title={'STATISTIC'}>
              <div>
                <h4 className={clsx([styles.title])}>STATISTIC</h4>
              </div>
              <hr></hr>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>No. </th>
                    <th>Month</th>
                    <th>Get</th>
                    <th>Advances</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>39$</td>
                    <td>8$</td>
                    <td>21$</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size='lg' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='updateEmployeeForm'
            // method='POST'
            onSubmit={handleSubmit}
          >
            <Form.Group controlId='fullNameInput' col='12' className='mb-3'>
              <Form.Label>Fullname Employee</Form.Label>
              <Form.Control
                type='text'
                placeholder='Fill the Fullname of Employee'
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col sm='6'>
                <Form.Group controlId='addressInput'>
                  <Form.Label column sm='4'>
                    Address
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Address'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='sexInput'>
                  <Form.Label column sm='4'>
                    Sex Employee
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Select name='sex' aria-label='Default select example'>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Group controlId='ageEmployeeInput'>
                  <Form.Label column sm='4'>
                    Age
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control type='text' placeholder='Age'></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='startDateEmployeeInput'>
                  <Form.Label column sm='4'>
                    Start Date
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control type='Date'></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Group controlId='moneyPerHourEmployeeInput'>
                  <Form.Label column sm='4'>
                    Mone/Hour
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Money'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='phoneNumberEmployeeInput'>
                  <Form.Label column sm='4'>
                    Phone Number
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Phone number'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <div className={clsx([styles.divbtn])}>
              <Button
                name='cancel'
                variant='danger'
                className={clsx([styles.btncancel])}
                onClick={handleClose}
              >
                CANCEL
              </Button>
              <Button
                name='save'
                type='submit'
                className={clsx([styles.btnsave])}
                variant='warning'
                onSubmit={handleSubmit}
              >
                SAVE
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
