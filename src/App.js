
import './App.css';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import EmployeeList from './components/EmployeeList';
import HeaderComponent from './components/HeaderComponent';
import FooterComponents from './components/FooterComponents';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import GetInfoComponent from './components/GetInfoComponent';





function App() {
  return (
    <div >
      <Router>
      <HeaderComponent/>
      <div className="container">
      
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add-employee" element={<AddEmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<AddEmployeeComponent />} />
            <Route path="/get-info/:empId" element={<GetInfoComponent/>} />
            
          </Routes>
          {/* <EmployeeList/> */}
      </div>
      <FooterComponents/>
      </Router>
      
    </div>
    
  );
}

export default App;
