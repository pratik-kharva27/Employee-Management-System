import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeManagerList = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()

  const deleteAdmin=(e)=>{

    axios
    .delete(`http://localhost:3000/auth/delete_employee/${e.id}`)
    .then((result) => {
      getEmp()
    })
    .catch((err) => console.log(err));
  }

  const getEmp =()=>{
    axios
    .get("http://localhost:3000/auth/employee")
    .then((result) => {
      if (result.data.Status) {
        setEmployee(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    getEmp()
  }, []);
 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/manager-dashboard/add_employee_manager" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th className="text-center">Action </th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/manager-dashboard/edit_employee_manager/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => deleteAdmin(e)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm me-2" onClick={()=>{
                      useNav(`/manager-dashboard/edit_manager_dashboard/${a.id}`)
                    }}>
                    Approval Leave
                  </button>
                  <button
                  onClick={()=>{
                    deleteAdmin(a)
                  }}
                    className="btn btn-warning btn-sm" >
                    Decline Leave
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagerList;