// src/components/EmployeeList.js


import React, { useState, useEffect } from 'react';
import EmployeeServices from '../services/EmployeeServices';
import { Link } from 'react-router-dom';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
        getAllEmployees();
  }, [])

  const getAllEmployees = ()=>{
    EmployeeServices.geAllEmployees().then((response)=>{
      setEmployees(response.data)
      console.log(response.data);
     }).catch(error =>{
      console.log(error);
     })
  }
  
  const deleteEmployee= (employeeId)=>{
    EmployeeServices.deleteEmployee(employeeId).then((response)=>{
      getAllEmployees();
    }).catch(error =>{
      console.log(error)
    }) 
  }
  return (

    <div className="container">
      <h2 className="text-center" >Employee List</h2>
      
      <Link to="/add-employee" className="btn btn-primary mb-2" target="_blank">Add Employee</Link>
      <span style={{ margin: '0 10px' }}></span>

      <Link to="/get-info/${employee.id}" className="btn btn-info mb-2" target="_blank">Get-Info</Link>
      
      <table className="table table-bordered table-striped" style={{ alignItems: 'center' }}> 
        <thead>
        <th>Employee id</th>
                <th > First Name</th>
                <th> Last Name</th>
                <th> Department</th>
                <th> email Id</th>
                <th> Address</th>
                <th> Salary</th>
                <th> Phone Number</th>
                <th> joining date</th>
                <th>Actions</th>
        </thead>
        <tbody>
        {
                employees.map(
                    employee => <tr key={employee.id}>
                        <td> {employee.id}</td>
                        <td> {employee.firstName}</td>
                        <td> {employee.lastName}</td>
                        <td> {employee.department}</td>
                        <td> {employee.emailId}</td>
                        <td> {employee.address}</td>
                        <td> {employee.salary}</td>
                        <td> {employee.phoneNumber}</td>
                        <td> {employee.dateOfJoining}</td>
                        <td>
                         <Link className="btn btn-info" to={`/edit-employee/${employee.id}`} target='_blank'>Update</Link> 
                         <span style={{ margin: '0 10px' }}></span>
                         <Link className="btn btn-danger" onClick={()=>deleteEmployee(employee.id)}>Delete</Link>
                          </td>
                    </tr>
                )
            }
        </tbody>
      </table>           
    </div>
  );
};

export default EmployeeList;
