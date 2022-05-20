import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaRegAddressCard } from 'react-icons/fa';
import {
  Form,
  FormCheck,
  FormGroup,
  Table,
  Pagination,
  Modal,
  Button,
  Col,
  Row,
} from 'react-bootstrap';
import styles from './Team.module.scss';
import clsx from 'clsx';

export default function Team() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
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
          <p className={clsx([styles.title])}>Total Teams: 3</p>
          <Table>
            <thead>
              <tr>
                <th>No. </th>
                <th>Name Team</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>QA Plug</td>
                <td>
                  <FaRegAddressCard />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col sm='7'>
          <p className={clsx([styles.titleResEmployee])}>
            Result all employee team Manager - Total 3 page
          </p>
          <Table>
            <thead>
              <tr>
                <th>No. </th>
                <th>Name Team</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Sex</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>QA Plug</td>
                <td>098812312</td>
                <td>Ho Chi Minh</td>
                <td>Male</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} size='lg' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='addTeamForm'
            // method='POST'
            onSubmit={handleSubmit}
          >
            <Form.Group controlId='fullNameInput' col='12' className='mb-3'>
              <Form.Label>Team's Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Fill the Name of the Teams'
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
