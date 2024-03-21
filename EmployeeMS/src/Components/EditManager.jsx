import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditManager = () => {
    const {id} = useParams()
    const [Manager, setManager] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
      });
      const navigate = useNavigate()


      useEffect(()=> {
        
        axios.get('http://localhost:3000/auth/manager/'+id)
        .then(result => {
            setManager({
                ...Manager,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                salary: result.data.Result[0].salary,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_manager/'+id, Manager)
        .then(result => {
            if(result.data.Status) {
              alert("Edit manager data successfully ")
                navigate('/dashboard/manager')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Manager</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={Manager.name}
              onChange={(e) =>
                setManager({ ...Manager, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={Manager.email}
              onChange={(e) =>
                setManager({ ...Manager, email: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={Manager.salary}
              onChange={(e) =>
                setManager({ ...Manager, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Address"
              autoComplete="off"
              value={Manager.address}
              onChange={(e) =>
                setManager({ ...Manager, address: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Manager
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditManager