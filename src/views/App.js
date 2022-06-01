import './App.scss';
import Navbar from '../components/Navbar/Navbar';
import { Row, Col } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Employee from './Employee/Employee';
import Team from './Team/Team';
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Row className='justify-content-md-center mt-5' style={{ margin: 0 }}>
        <Col sm='8'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/employee/:id' element={<Employee />} />
            <Route exact path='/team' element={<Team />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
}

export default App;
