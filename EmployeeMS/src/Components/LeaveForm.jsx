import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const [employee, setEmployee] = useState([{id:12 , name: "sparrow"},{id:22 , name: "demo"} ]);
  console.log("employee", employee)
  const [selectValue, setSelectValue] = useState({});
  const [Leave, setLeave] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result?.data?.Status) {

          setEmployee(result?.data?.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(employee ,"emp")
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", Leave.name);
    formData.append("email", Leave.email);
    formData.append("password", Leave.password);
    formData.append("address", Leave.address);
    formData.append("salary", Leave.salary);
    formData.append("image", Leave.image);
    formData.append("category_id", Leave.category_id);

    axios
      .post("http://localhost:3000/auth/add_Leave", formData)
      .then((result) => {

        if (result.data.Status) {
          navigate("/dashboard/Leave");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    console.log(e.target.value, "sd");
  }

  const dropdownChange = (e) => {
    setSelectValue(e.target.value)
  }


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Leave</h3>
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
              onChange={(e) =>
                setLeave({ ...Leave, name: e.target.value })
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
              onChange={(e) =>
                setLeave({ ...Leave, email: e.target.value })
              }
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
              onChange={(e) =>
                setLeave({ ...Leave, address: e.target.value })
              }
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
              onChange={(e) =>
                setLeave({ ...Leave, address: e.target.value })
              }
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
              onChange={(e) =>
                setLeave({ ...Leave, address: e.target.value })
              }
            />
          </div>



          <div>
            <label >Choose an option </label>

            {employee && employee.length ?
              (
                <select id="dropdown" value={selectValue} onChange={dropdownChange} >
                  {employee.map((data , i) => {
                    return (
                      <option  key={i} style={{width : "50px"}}
                      value={data?.name}
                    >
                     {data.name}
                    </option>
                    )
                   
                  })}
                  {/* <option>sparrow</option> */}
                </select >

              ) : <p>{console.log("not")}employee not found</p>

            }


          </div>


          <div className="col-12">
            <button className="btn btn-primary w-100">
              Apply Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;



