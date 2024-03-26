import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()
    
    const [email, setEmail] = useState([])
    
    const doneBtn = (data) =>{
      axios.post('http://localhost:3000/employee/doneBtn',{email:data})
        .then(result => {
         
        })
        .catch(err => console.log(err))

        window.location.reload()
    }

    const getEmpbyId = () => {
      axios.get('http://localhost:3000/employee/detail/'+id)
      .then(result => {
          setEmployee(result.data[0])
      })
      .catch(err => console.log(err))
    }
    useEffect(() => {
      getEmpbyId()
        setEmail(localStorage.getItem('email'))
        
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {

          localStorage.removeItem("valid")
          navigate('/')
          
        }).catch(err => console.log(err))
      }
  return (
    <div >
        <div className="p-2 shadow">
        <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col text-center"><h4>Employee Management System </h4></div>
          <div className="col text-end"><h4>{email}</h4></div>
        </div>
        </div>
        </div>
        <div className='d-flex justify-content-center align-items-center mt-3'>
          <div className='container'>
          <div className='row justify-content-center align-items-center '>
            <div className='col'></div>
            <div className='col text-center'>
            <img src={`http://localhost:3000/Images/`+employee?.image} className='emp_det_image mx-auto'/>
            </div>
            <div className='col text-left '>
              <h2>Leave Status 
                {employee?.leave_status !== 2 ? 
                <button className='btn btn-primary' style={{marginLeft: '10px'}} onClick={()=>{
                        doneBtn(employee?.email)
                      }}> Done </button>
                      : ''}
              </h2>
                <h4>{employee?.leave_status == 1 ? " your Leave Approve" : null}</h4>
                <h4>{employee?.leave_status == 0 ?  " your Leave Dis-Approved" : null}</h4>
                <h4>{employee?.leave_status == 2 ?  "" : null}</h4>
            </div>
          </div>
            <div className='d-flex align-items-center flex-column mt-3'>
                <h3>Name: {employee?.name}</h3>
                <h3>Email: {employee?.email}</h3>
                <h3>Salary: ₹{employee?.salary}</h3>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                {/* <button className='btn btn-primary me-2'>Edit</button> */}
                <button className='btn btn-danger me-2' onClick={handleLogout}>Logout</button>
                <button className='btn btn-primary me-2' onClick={()=>{
                      navigate('/addleave')
                    }}>Apply Leave</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EmployeeDetail