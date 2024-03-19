import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Manager = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()

  const getManager = () => {
    axios
    .get("http://localhost:3000/auth/manager")
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
    getManager()
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_manager/'+id)
    .then(result => {
      getManager()
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Manager List</h3>
      </div>
      <Link to="/dashboard/add_manager" className="btn btn-success">
        Add Manager
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
              <th>Action</th>
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
                    to={`/dashboard/edit_manager/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
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

export default Manager;