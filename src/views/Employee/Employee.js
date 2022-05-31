import React, { useState, useEffect, useRef } from 'react';
import image from '../../assets/img/default-avatar.png';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import moment from 'moment';

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
  const [showWorkingModal, setShowWorkingModal] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowWorkingModel = () => setShowWorkingModal(true);
  const handleCloseWorkingMode = () => setShowWorkingModal(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [teamDTO, setTeamDTO] = useState({});
  const [startDate, setStartDate] = useState();
  const [img, setImg] = useState();
  const [urlImg, setUrlImg] = useState();
  const [avatar, setAvatar] = useState();
  const [teams, setTeams] = useState([]);
  const [workings, setWorkings] = useState([]);
  const [advances, setAdvances] = useState([]);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const handleShowAdvanceModal = () => setShowAdvanceModal(true);
  const handleCloseAdvanceModal = () => setShowAdvanceModal(false);
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [monthCurrent, setMonthCurrent] = useState(1);
  const [statical, setStatiscal] = useState({});
  const [random, setRandom] = useState();
  useEffect(() => {
    fetchData();
  }, [random]);
  const fetchData = async () => {
    const employeeRes = await axios.get(
      `http://localhost:8087/api/employees/` + id,
    );
    const teamsRes = await axios.get(`http://localhost:8087/api/teams`);
    const workingsRes = await axios.get(
      `http://localhost:8087/api/workings/` + id,
    );
    const advancesRes = await axios.get(
      `http://localhost:8087/api/advance/` + id,
    );
    console.log(employeeRes.data);
    setEmployee(employeeRes.data);
    setTeamDTO(employeeRes.data.teamDTO);
    setLoading(false);
    setTeams(teamsRes.data);
    setAdvances(advancesRes.data);
    setWorkings(workingsRes.data);
    getImg(employeeRes);
    const startDay = moment(employeeRes.data.startDay).format('YYYY-MM-DD');
    setStartDate(startDay);
    console.log(employeeRes.data.imageDTO.url);
  };
  const handlePreviewAvatar = (event) => {
    console.log(event);
    const file = event.target.files[0];
    file && (file.preview = URL.createObjectURL(file));
    setAvatar(file);
  };
  const getImg = (res) => {
    console.log(res.data.imageDTO);
    if (res.data.imageDTO !== null) {
      setUrlImg(res.data.imageDTO.url);
      setImg(res.data.imageDTO);
    } else {
      setUrlImg(image);
      setImg(res.data.imageDTO);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.target);
    const updateEmployee = {
      fullName: data.get('fullName').toString(),
      age: parseInt(data.get('age')),
      sex: data.get('sex'),
      address: data.get('address').toString(),
      phoneNumber: data.get('phoneNumber').toString(),
      startDay: data.get('startDate'),
      position: data.get('position'),
      moneyPerHour: parseFloat(data.get('moneyPerHour')),
      teamDTO: {
        id: data.get('team'),
      },
    };
    const image = new FormData();
    image.append('file', data.get('imageUpload'));
    axios({
      method: 'PUT',
      url: 'http://localhost:8087/api/employees/' + id,
      data: updateEmployee,
    }).then(function (res) {
      // window.location.reload();
      fetchData();
    });
    if (employee.imageDTO === null) {
      await axios({
        method: 'POST',
        url: 'http://localhost:8087/api/images/new?employee_id=' + employee.id,
        data: image,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(function (res) {
        fetchData();
      });
    } else if (data.get('imageUpload').name !== '') {
      await axios({
        method: 'PUT',
        url: 'http://localhost:8087/api/images/image/' + employee.imageDTO.id,
        data: image,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(function (res) {});
    }
    // fetchData();
    handleClose();
    setRandom(Math.random());
  };
  const handleDelete = async (event) => {
    let check = window.confirm('Are you sure to delete this employee?');
    if (check) {
      const deleteRes = await axios
        .delete(`http://localhost:8087/api/employees/` + id)
        .then(function (res) {
          if (res.status === 200) {
            window.alert('Delete Success!');
          }
        });
      window.location.href = '/';
    }
  };
  const handleDeleteWoking = async (id) => {
    let check = window.confirm('Are you sure to delete this working?');
    if (check) {
      const deleteRes = await axios
        .delete(`http://localhost:8087/api/workings/` + id)
        .then(function (res) {
          if (res.status === 200) {
            window.alert('Delete Success!');
            fetchData();
          }
        });
    }
  };
  const handleSubmitWorking = async (event) => {
    event.preventDefault();
    console.log(event);
    const data = new FormData(event.target);
    const working = {
      hour: data.get('hour'),
      date: data.get('dateWorking'),
      employeeDTO: {
        id: employee.id,
      },
    };
    const resAddWorking = await axios({
      method: 'POST',
      url: 'http://localhost:8087/api/workings/new',
      data: working,
    }).then(function (res) {
      fetchData();
    });
    console.log(working);
  };
  const handleDeleteAdvance = async (id) => {
    let check = window.confirm('Are you sure to delete this working?');
    if (check) {
      const deleteRes = await axios
        .delete(`http://localhost:8087/api/advance/` + id)
        .then(function (res) {
          if (res.status === 200) {
            window.alert('Delete Success!');
            fetchData();
          }
        });
    }
  };
  const handleStastical = async (event) => {
    console.log(event.target.value);
    let month = event.target.value;
    const stastical = await axios.get(
      `http://localhost:8087/api/statistic?employee_id=` +
        employee.id +
        `&month=` +
        month,
    );
    setMonthCurrent(month);
    setStatiscal(stastical.data);
  };
  const handleSubmitAdvance = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const advance = {
      money: data.get('money'),
      date: data.get('dateAdvance'),
      employeeDTO: {
        id: employee.id,
      },
    };
    axios({
      method: 'POST',
      url: 'http://localhost:8087/api/advance/new',
      data: advance,
    }).then(function (res) {
      fetchData();
    });
  };
  console.log(random);
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
      <span className={clsx([styles.btnDeleteEmployee])}>
        <FaTrashAlt onClick={handleDelete} />
      </span>
      <span className={clsx([styles.btnEditEmployee])} onClick={handleShow}>
        <FaEdit />
      </span>
      <h4 className={clsx([styles.txtNameEmployee])}>{employee.fullName}</h4>
      <br />
      <hr></hr>
      <div className={clsx(['row'])}>
        <div className={clsx(['col-4'])}>
          <img
            className={clsx([styles.avatar])}
            src={urlImg + '?n=' + random}
            id='test'
          />
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
                      defaultValue={startDate}
                      readOnly={showform}
                    />
                  </Col>
                  <Col sm='6'>
                    <Form.Control
                      name='team'
                      type='text'
                      id='team'
                      value={'Team: ' + teamDTO.name}
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
                  <FaPlusCircle onClick={handleShowWorkingModel} />
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
                  {workings.map((working) => (
                    <tr key={working.id}>
                      <td>{workings.indexOf(working) + 1}</td>
                      <td>{working.date}</td>
                      <td>{working.hour}</td>
                      <td>
                        <span className={clsx([styles.deleteAdvance])}>
                          <FaTrashAlt
                            onClick={() => handleDeleteWoking(working.id)}
                          />
                        </span>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={'advances'} title={'ADVANCES'}>
              <div>
                <span className={clsx([styles.btnAddWorking])}>
                  <FaPlusCircle onClick={handleShowAdvanceModal} />
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
                  {advances.map((advance) => (
                    <tr key={advance.id}>
                      <td>{advances.indexOf(advance) + 1}</td>
                      <td>{advance.date}</td>
                      <td>{advance.money}</td>
                      <td>
                        <span className={clsx([styles.deleteAdvance])}>
                          <FaTrashAlt
                            onClick={() => handleDeleteAdvance(advance.id)}
                          />
                        </span>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={'statistics'} title={'STATISTIC'}>
              <div>
                <h4 className={clsx([styles.title])}>STATISTIC</h4>
                <hr></hr>
              </div>
              <div>
                <Row>
                  <Col sm='6'>
                    <Form.Group controlId='month'>
                      <Col sm='4'>
                        <Form.Label column sm='4'>
                          <b>Month</b>
                        </Form.Label>
                      </Col>
                      <Col sm='8'>
                        <Form.Select
                          name='month'
                          aria-label='Default select example'
                          onChange={handleStastical}
                        >
                          {month.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
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
                    <td>{monthCurrent}</td>
                    <td>{statical.totalGet}$</td>
                    <td>{statical.totalAdvance}$</td>
                    <td>{statical.summary}$</td>
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
                defaultValue={employee.fullName}
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
                      defaultValue={employee.address}
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
                    <Form.Select
                      name='sex'
                      aria-label='Default select example'
                      defaultValue={employee.sex}
                    >
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
                      defaultValue={employee.age}
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
                    <Form.Control
                      type='Date'
                      defaultValue={startDate}
                      name='startDate'
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Group controlId='moneyPerHourEmployeeInput'>
                  <Form.Label column sm='4'>
                    Money/Hour
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Money'
                      defaultValue={employee.moneyPerHour}
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
                      defaultValue={employee.phoneNumber}
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
                      defaultValue={teamDTO.id}
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
                <Form.Group controlId='startDateEmployeeInput'>
                  <Form.Label column sm='4'>
                    Position
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      defaultValue={employee.position}
                      name='position'
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
              >
                SAVE
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal add working */}
      <Modal
        show={showWorkingModal}
        onHide={handleCloseWorkingMode}
        size='lg'
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Working</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='addWorking'
            // method='POST'
            onSubmit={handleSubmitWorking}
          >
            <Row>
              <Col sm='6'>
                <Form.Group controlId='hour'>
                  <Form.Label column sm='4'>
                    Hour
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Hour'
                      name='hour'
                      // defaultValue={employee.position}
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='positionEmployee'>
                  <Form.Label column sm='4'>
                    Date
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='date'
                      // placeholder=''
                      name='dateWorking'
                      // defaultValue={employee.position}
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
                onClick={handleCloseWorkingMode}
              >
                CANCEL
              </Button>
              <Button
                name='save'
                type='submit'
                className={clsx([styles.btnsave])}
                variant='warning'
                onSubmit={handleSubmitWorking}
              >
                SAVE
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal add Advance */}
      <Modal
        show={showAdvanceModal}
        onHide={handleCloseAdvanceModal}
        size='lg'
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Advance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className='addAdvance'
            // method='POST'
            onSubmit={handleSubmitAdvance}
          >
            <Row>
              <Col sm='6'>
                <Form.Group controlId='hour'>
                  <Form.Label column sm='4'>
                    Money
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='text'
                      placeholder='Money'
                      name='money'
                      // defaultValue={employee.position}
                    ></Form.Control>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group controlId='positionEmployee'>
                  <Form.Label column sm='4'>
                    Date
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      type='date'
                      // placeholder=''
                      name='dateAdvance'
                      // defaultValue={employee.position}
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
                onClick={handleCloseWorkingMode}
              >
                CANCEL
              </Button>
              <Button
                name='save'
                type='submit'
                className={clsx([styles.btnsave])}
                variant='warning'
                onSubmit={handleSubmitAdvance}
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
