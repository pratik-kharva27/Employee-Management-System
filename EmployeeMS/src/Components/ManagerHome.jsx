import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const ManagerHome = () => {
  const useNav = useNavigate()
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])
  const [managerTotal, setmanagerTotal]= useState(0)

  useEffect(() => { 
    employeeCount();
    salaryCount();
    AdminRecords();
    managerCount();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/manager')
    .then(result => {
        setAdmins(result.data.Result)
    })
  }

  const deleteAdmin=(e)=>{

    axios
    .delete(`http://localhost:3000/auth/delete_manager/${e.id}`)
    .then((result) => {
      employeeCount();
      salaryCount();
      AdminRecords();
      managerCount();
    })
    .catch((err) => console.log(err));
  }



  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status) {
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const managerCount = () => {
    axios.get('http://localhost:3000/auth/manager_count')
    .then(result => {
      if(result.data.Status) {
        setmanagerTotal(result.data.Result[0].manager)
      }
      
    })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
    .then(result => {
      if(result.data.Status) {
        setSalaryTotal(result.data.Result[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Manager</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{managerTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>₹ {salaryTotal}</h5>
          </div>
        </div>
      </div>
    
      <div className='mt-4 px-5 pt-3'>
      <Link to="/manager-dashboard/add_manager_dashboard" className="btn btn-success mb-4">
        Add Manager
      </Link>
        <h3>List of Manager</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((a,index) => (
                <tr key={index}>
                    <td>
                  <img
                    src={`http://localhost:3000/Images/` + a.image}
                    className="employee_image"
                  />
                </td>
                  <td>{a.email}</td>
                  <td>
                  <button
                    className="btn btn-info btn-sm me-2" onClick={()=>{
                      useNav(`/manager-dashboard/edit_manager_dashboard/${a.id}`)
                    }}>
                    Edit
                  </button>
                  <button
                  onClick={()=>{
                    deleteAdmin(a)
                  }}
                    className="btn btn-warning btn-sm" >
                    Delete
                  </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManagerHome