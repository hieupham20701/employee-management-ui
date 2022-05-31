import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { FaInfo, FaTrashAlt, FaPlusCircle, FaPencilAlt } from 'react-icons/fa';
import image from '../../assets/img/default-avatar.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import LoadingScreen from 'react-loading-screen';
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
  const pageNumbers = [];
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [totalEmployee, setTotalEmployee] = useState();
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [idDelete, setIdDelete] = useState([]);
  const [selectedEmployee, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const index = 0;
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(employees);
  // console.log(totalEmployee);
  const fetchData = async (currentPage) => {
    var page = 0;
    if (currentPage !== undefined) {
      page = currentPage;
    }
    const employees = await axios.get(
      `http://localhost:8087/api/employees/pages?page=` + page,
    );
    const teams = await axios.get(`http://localhost:8087/api/teams`);
    setTotalEmployee(employees.data.totalItems);
    setEmployees(employees.data.employeeDTOs);
    setTeams(teams.data);
    setTotalPage(employees.data.totalPages);
    setLoading(false);
  };
  for (let i = 0; i < totalPage; i++) {
    pageNumbers.push(i);
  }
  const handleSubmitEmployee = async (event) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.target);
    const newEmployee = {
      fullName: data.get('fullName').toString(),
      age: parseInt(data.get('age')),
      sex: data.get('sex'),
      address: data.get('address').toString(),
      phoneNumber: data.get('phoneNumber').toString(),
      startDay: data.get('startDay'),
      position: data.get('position'),
      moneyPerHour: parseFloat(data.get('moneyPerHour')),
      teamDTO: {
        id: data.get('team'),
      },
    };
    // console.log(newEmployee);
    // console.log(data.get('imageUpload'));
    const image = new FormData();
    image.append('file', data.get('imageUpload'));

    axios({
      method: 'POST',
      url: 'http://localhost:8087/api/employees/new',
      data: newEmployee,
    }).then(function (res) {
      console.log(res.data);

      fetchData();
      if (data.get('imageUpload') !== '') {
        handleSubmitImage(res.data, image);
      }
    });
  };
  const handleSubmitImage = async (employee, image) => {
    axios({
      method: 'POST',
      url: 'http://localhost:8087/api/images/new?employee_id=' + employee.id,
      data: image,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(function (res) {
      console.log(res);
    });
  };

  const changePage = (event, pageCurrent) => {
    console.log(pageCurrent);
    setCurrentPage(pageCurrent);
    fetchData(pageCurrent);
  };

  const handleDeleteItem = async (id) => {
    let check = window.confirm('Are you sure to delete this employee?');
    if (check) {
      const deleteRes = await axios
        .delete(`http://localhost:8087/api/employees/` + id)
        .then(function (res) {
          if (res.status === 200) {
            window.alert('Delete Success!');
          }
        });
      await fetchData();
    }
  };

  const handleMultiDelete = async (event) => {
    let check = window.confirm('Are you sure to delete them?');
    console.log(selectedEmployee);
    if (check) {
      selectedEmployee.forEach((item) => idDelete.push(item.id));
      console.log(idDelete);
      const deleteRes = await axios
        .delete(`http://localhost:8087/api/employees`, {
          data: idDelete,
        })
        .then(function (res) {
          if (res.status === 200) {
            const checkboxes = document.querySelectorAll(
              'input[type="checkbox"]',
            );
            for (var checkbox of checkboxes) {
              checkbox.checked = false;
            }
            window.alert('Delete Success!');
          }
        });
      fetchData();
      setSelectedEmployees([]);
      setIdDelete([]);
      let remainEmployees;
      remainEmployees = employees.filter(
        (remainEmployee) => remainEmployee.isChecked !== true,
      );
      setEmployees(remainEmployees);
    }
  };

  const handleAllChecked = (event) => {
    console.log(event);
    const tempEmployee = employees;
    tempEmployee.forEach(
      (employee) => (employee.isChecked = event.target.checked),
    );
    setEmployees(tempEmployee);
    console.log(tempEmployee);
    setSelectedEmployees(
      tempEmployee.filter((item) => item.isChecked === true),
    );
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var checkbox of checkboxes) {
      checkbox.checked = event.target.checked;
    }
  };

  const handleCheckChieldElement = (event) => {
    console.log(event.target.checked);
    let tempEmployee = employees;
    let tempSelectedEmployee = [];
    tempEmployee.forEach((employee) => {
      if (employee.id.toString() === event.target.value) {
        employee.isChecked = event.target.checked;
      }
      if (employee.isChecked) {
        tempSelectedEmployee.push(employee);
      }
      setSelectedEmployees(tempSelectedEmployee);
    });
  };
  console.log(selectedEmployee.length);
  let temp;
  if (selectedEmployee.length === 0) {
    console.log(selectedEmployee);
    temp = false;
  } else temp = true;
  const handlePreviewAvatar = (event) => {
    console.log(event);
    const file = event.target.files[0];
    file && (file.preview = URL.createObjectURL(file));
    setAvatar(file);
  };

  const EmployeeDetail = (id) => {
    window.location = '/employee/' + id;
  };
  return (
    <>
      <LoadingScreen
        loading={loading}
        bgColor='#f1f1f1'
        spinnerColor='#9ee5f8'
        textColor='#676767'
        logoSrc='../../coding_club.png'
        text='Wait a minute!'
      ></LoadingScreen>
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
        onClick={handleMultiDelete}
      >
        <FaTrashAlt />
      </span>
      <h4 className={clsx([styles.title])}>Employee Management</h4>
      <br />
      <hr />
      <p className={clsx([styles.title])}>Total {totalEmployee} Employees</p>
      <Form className={clsx([styles.formSearchEmployee])}>
        <Form.Group className='mb-3' controlId='formBasicText'>
          <input
            type='text'
            id='txtSearch'
            placeholder='&#xF002; Search by Name'
            style={{ fontFamily: 'Arial, FontAwesome' }}
          />
        </Form.Group>
      </Form>
      <Table bordered='1'>
        <thead>
          <tr>
            <th>
              <Form.Check
                id={`default-checkbox`}
                type='checkbox'
                onClick={handleAllChecked}
              ></Form.Check>
            </th>
            <th>No. </th>
            <th>Fullname</th>
            <th>Phone</th>
            <th>Team</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                {' '}
                <input
                  type='checkbox'
                  id={`default-checkbox`}
                  className={'item-checkbox'}
                  value={employee.id}
                  defaultChecked={employee.isChecked}
                  onClick={handleCheckChieldElement}
                ></input>
              </td>
              <td>{employees.indexOf(employee) + 1}</td>
              <td>{employee.fullName}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.teamDTO.name}</td>
              <td>
                <FaInfo
                  onClick={() => EmployeeDetail(employee.id)}
                  className={clsx([styles.btnDetailInfo])}
                />
                <FaTrashAlt
                  onClick={() => handleDeleteItem(employee.id)}
                  className={clsx([styles.btnDetailInfo])}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ float: 'right' }}>
        <Pagination>
          <Pagination.First onClick={(e) => changePage(e, 0)} />
          <Pagination.Prev
            onClick={(e) =>
              changePage(e, currentPage > 0 ? currentPage - 1 : 0)
            }
          />
          {pageNumbers.map((pageNumber) => {
            return (
              <Pagination.Item
                activeLabel='(current)'
                className={clsx('page' + pageNumber)}
                key={pageNumber}
                onClick={(e) => changePage(e, pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            onClick={(e) =>
              changePage(
                e,
                currentPage < totalPage - 1 ? currentPage + 1 : totalPage - 1,
              )
            }
          />
          <Pagination.Last onClick={(e) => changePage(e, totalPage - 1)} />
        </Pagination>
      </div>
      <Modal show={show} onHide={handleClose} size='lg' centered={true}>
        <Modal.Header closeButton className={clsx([styles.headerModal])}>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='addEmployeeForm'
            // method='POST'
            onSubmit={handleSubmitEmployee}
          >
            <div className={clsx([styles.centerAlign])}>
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
            </div>
            <Form.Group
              className={clsx('mb-3', [styles.imageInput])}
              controlId='imageInput'
            >
              <Form.Control
                className={clsx('shadow-none')}
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
                name='fullName'
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
                      name='address'
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
                      <option value={true}>Male</option>
                      <option value={false}>Female</option>
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
                    <Form.Control
                      type='text'
                      placeholder='Age'
                      name='age'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='startDateEmployeeInput'>
                  <Form.Label column sm='4'>
                    Start Date
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control type='Date' name='startDay'></Form.Control>
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
                      name='moneyPerHour'
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
                      name='phoneNumber'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Group controlId='teamEmployee'>
                  <Form.Label column sm='4'>
                    Team
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Select
                      name='team'
                      aria-label='Default select example'
                    >
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='positionEmployee'>
                  <Form.Label column sm='4'>
                    Position
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Position'
                      name='position'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Button
              type='submit'
              onSubmit={handleSubmitEmployee}
              variant='danger'
              className={clsx([styles.btnSubmit])}
              onClick={handleClose}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
