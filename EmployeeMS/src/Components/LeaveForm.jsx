import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  
  const [employee, setEmployee] = useState([
    { id: 12, name: "sparrow" },
    { id: 22, name: "demo" },
  ]);
  const [selectValue, setSelectValue] = useState({});
  const [Leave, setLeave] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const navigate = useNavigate();

  const [email, setEmail] = useState([])

  
  // const [category, setCategory] = useState([]);

  useEffect(() => {
   
    setEmail(localStorage.getItem('email'))
   
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/add_Leave", Leave)
      .then((result) => {
        if (result.data) {
          alert("Leave Applied");
          // console.log(result,"asdasd");return
          navigate(`/employee_detail/${result.data.id}`);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
      
  };

  // const handleChange = (e) => {
  //   console.log(e.target.value, "sd");
  // };

  // const dropdownChange = (e) => {
  //   setSelectValue(e.target.value);
  // };

  // console.log(employee, "emp");
  return (
    <div>
      <div className="p-2 shadow">
        <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col text-center"><h4>Employee Management System </h4></div>
          <div className="col text-end"><h4>{email}</h4></div>
        </div>
        </div>
        </div>
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Leave </h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>

            {/* {employee && employee.length ? (
              <select
                id="dropdown"
                value={selectValue}
                onChange={dropdownChange}
              >
                {employee.map((data, i) => {
                  return (
                  <option value='select'> Select </option>,
                    <option
                      key={i}
                      className="form-control rounded-0"
                      value={data?.name}
                    >
                      {data.name}
                    </option>
                  );
                })}
              </select>
            ) : (
              <p>{console.log("not")}employee not found</p>
            )} */}

            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) => setLeave({ ...Leave, name: e.target.value })}
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
              onChange={(e) => setLeave({ ...Leave, email: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Start date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Start Date"
              onChange={(e) => setLeave({ ...Leave, startDate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              End date
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter End date"
              onChange={(e) => setLeave({ ...Leave, endDate: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Reason of Leave
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Enter Reason...."
              onChange={(e) => setLeave({ ...Leave, reason: e.target.value })}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary w-100" >Apply Leave</button>
          </div>
          
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddLeave;
