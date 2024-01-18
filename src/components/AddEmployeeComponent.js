import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import EmployeeServices from '../services/EmployeeServices';

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfJoining,setDateOfJoining]=useState('');
  const {id}=useParams();
  const navigate = useNavigate();

  const saveOrUpdateEmployee = () => {
    const employee = {
      firstName,
      lastName,
      department,
      emailId,
      address,
      salary,
      phoneNumber,
      dateOfJoining
    };
    if(id){
      EmployeeServices.updateEmployee(id, employee)
      .then((response) => {
        navigate('/employees'); // Update to use navigate

        alert('Employee updation successfully!');
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
        // Make a POST request to save the employee data
    fetch('http://localhost:8080/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Employee saved successfully:', data);

        alert('Employee saved successfully!');
        // You can reset the form or perform any other actions after successful save
      })
      .catch(error => {
        console.error('Error saving employee:', error);
        // Handle the error (display an error message or perform other actions)
      });
  };
    }
    

  useEffect(() => {
      EmployeeServices.getEmployeeById(id).then((response)=>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setDepartment(response.data.department)
        setEmailId(response.data.emailId)
        setAddress(response.data.address)
        setSalary(response.data.salary)
        setPhoneNumber(response.data.phoneNumber)
        setDateOfJoining(response.data.dateOfJoining)
      }).catch(error=>{
          console.log(error)
      })
  },[])

 const title=()=>{
    if(id){
      return <h2 className="text-center">Update Employee</h2>
    }else{
      return <h2 className="text-center">Add Employee</h2>
    }
  }

  return (
    <div>
      <br></br> <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {
                title()
              }
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      className="form-control"
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      className="form-control"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      placeholder="Enter your department"
                      name="department"
                      className="form-control"
                      value={department}
                      onChange={(e)=>setDepartment(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Email Id</label>
                    <input
                      type="email"
                      placeholder="Enter your Email Id"
                      name="emailId"
                      className="form-control"
                      value={emailId}
                      onChange={(e)=>setEmailId(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      placeholder="Enter address"
                      name="address"
                      className="form-control"
                      value={address}
                      onChange={(e)=>setAddress(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Salary</label>
                    <input
                      type="text"
                      placeholder="Enter salary"
                      name="salary"
                      className="form-control"
                      value={salary}
                      onChange={(e)=>setSalary(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="number"
                      placeholder="Enter your phone number"
                      name="phonenumber"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e)=>setPhoneNumber(e.target.value)}
                      >
                      </input>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">Date Of Joining</label>
                    <input
                      type="date"
                      placeholder="Enter Date"
                      name="dateOfJoining"
                      className="form-control"
                      value={dateOfJoining}
                      onChange={(e)=>setDateOfJoining(e.target.value)}
                      >
                      </input>
                  </div>
                  
                  <button className='btn btn-success' onClick={(e)=>saveOrUpdateEmployee(e)}>Save</button>
                  <span style={{ margin: '0 10px' }}></span>
                  <Link to="/" className="btn btn-danger style">Cancel</Link>


                </form>
                
              </div>
              
            </div>
          </div>
        </div>
    <br></br><br></br>

    </div>
  )
}

export default AddEmployeeComponent
