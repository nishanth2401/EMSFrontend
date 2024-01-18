import React, { useState } from 'react';
import { differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import EmployeeServices from '../services/EmployeeServices';

const GetInfoComponent = () => {
  const [empId, setEmpId] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [error, setError] = useState('');

  const fetchEmployeeDetails = () => {
    // Reset previous error message
    setError('');

    // Fetch employee details based on empId
    EmployeeServices.getEmployeeById(empId)
      .then((response) => {
        setEmployeeDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the case where the employee ID is not found
        if (error.response && error.response.status === 404) {
          setError('Employee not found. Please enter a valid ID.');
        } else {
          console.log(error);
          setError('An error occurred while fetching employee details.');
        }
      });
  };

  // Function to calculate the number of years, months, and days an employee has worked
  const calculateWorkDuration = () => {
    if (employeeDetails && employeeDetails.dateOfJoining) {
      const joiningDate = new Date(employeeDetails.dateOfJoining);
      const currentDate = new Date();

      const years = differenceInYears(currentDate, joiningDate);
      const months = differenceInMonths(currentDate, joiningDate) % 12;
      const days = differenceInDays(currentDate, joiningDate);

      return { years, months, days };
    }
    return null;
  };

  return (
    <div className="container">
      <h2 className="text-center">Employee Details</h2>

      {/* Input field for entering empId */}
      <div>
        <label htmlFor="empId">Enter Employee ID:</label>
        <input
          type="text"
          id="empId"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
        <br />
        <button onClick={fetchEmployeeDetails} className="btn btn-success mb-2">
          Fetch Details
        </button>
      </div>

      {/* Display employee details or error message */}
      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        employeeDetails && (
          <div>
            <p>First Name: {employeeDetails.firstName}</p>
            <p>Last Name: {employeeDetails.lastName}</p>
            <p>Department: {employeeDetails.department}</p>
            <p>Email Id: {employeeDetails.emailId}</p>
            <p>Address: {employeeDetails.address}</p>
            <p>Salary: {employeeDetails.salary}</p>
            <p>Phone Number: {employeeDetails.phoneNumber}</p>
            <p>Joining date: {employeeDetails.dateOfJoining}</p>
            {calculateWorkDuration() && (
              <p>
                Work Duration:  {calculateWorkDuration().days} days
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default GetInfoComponent;
