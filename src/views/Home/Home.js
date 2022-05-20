import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { FaInfo, FaTrashAlt, FaPlusCircle, FaPencilAlt } from 'react-icons/fa';
import image from '../../assets/img/default-avatar.png';

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
export default function Home() {
  const selectedEmployees = [];
  const pageNumbers = [];
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  const handlePreviewAvatar = (event) => {
    const file = event.taget.file[0];
    file && (file.preview = URL.createObjectURL(file));
    setAvatar(file);
  };
  let temp;
  if (selectedEmployees.length === 0) {
    temp = false;
  } else temp = true;

  return (
    <>
      <span
        id='btnAddEmployee'
        className={clsx([styles.btnAddEmployee])}
        onClick={handleShow}
      >
        <FaPlusCircle />
      </span>

      <span
        id='multiDelBtn'
        className={clsx([styles.unactiveMultiDel], {
          [styles.activeMultiDel]: temp,
        })}
      >
        <FaTrashAlt />
      </span>
      <h4 className={clsx([styles.title])}>Employee Management</h4>
      <br />
      <hr />
      <p className={clsx([styles.title])}>Total 6 Employees</p>
      <Form className={clsx([styles.formSearchEmployee])}>
        <Form.Group className='mb-3' controlId='formBasicText'>
          <input
            type='text'
            id='txtSearch'
            placeholder='&#xF002; Search by Name'
            // className={clsx([styles.txtSearchEmployee])}
            style={{ fontFamily: 'Arial, FontAwesome' }}
          />
        </Form.Group>
      </Form>
      <Table bordered='1'>
        <thead>
          <tr>
            <th>
              <FormCheck id={`default-checkbox`}></FormCheck>
            </th>
            <th>No. </th>
            <th>Fullname</th>
            <th>Phone</th>
            <th>Team</th>
            <th>Option</th>
          </tr>
        </thead>
      </Table>
      <div style={{ float: 'right' }}>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {pageNumbers.map((pageNumber) => {
            return (
              <Pagination.Item
                className={clsx('page' + pageNumber)}
                key={pageNumber}
                // onClick={(e) => paginate(e, { pageNumber })}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
      <Modal show={show} onHide={handleClose} size='lg' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='addEmployeeForm'
            // method='POST'
            onSubmit={handleSubmit}
          >
            <div className={clsx([styles.labelDiv])}>
              <Form.Label
                className={clsx([styles.avatarLabel])}
                htmlFor='imageInput'
              >
                <FaPencilAlt />
              </Form.Label>
            </div>
            <div className={clsx([styles.avatarPreview])}>
              {avatar ? (
                <img
                  className={clsx([styles.imageUpload])}
                  src={avatar.preview}
                  alt=''
                />
              ) : (
                <img
                  className={clsx([styles.imageUpload])}
                  src={image}
                  alt=''
                />
              )}
            </div>
            <Form.Group
              className={clsx('mb-3', [styles.imageInput])}
              controlId='imageInput'
            >
              <Form.Control
                className={clsx('shadow-none', [styles.formInput])}
                name='imageUpload'
                type='file'
                accept='image/*'
                onChange={handlePreviewAvatar}
              />
            </Form.Group>

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
            <Button variant='primary' type='submit' onSubmit={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
