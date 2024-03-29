import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

const AddAdmin = () => {

  const params = useParams();
 

  const [employee, setEmployee] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

      
  getAdmin()
  }, []);

  const getAdmin=()=>{
    axios
    .get(`http://localhost:3000/auth/getAdminbyId/${params.id}`)
    .then((result) => {
      let val = result.data.Result.email
      setEmail(val)
      document.getElementById('inputEmail4').value = val
    })
    .catch((err) => console.log(err));
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
        email: email,
        password: password
    };

    if(params.id){
      axios
      .put(`http://localhost:3000/auth/edit_admin/${params.id}`, payload)
      .then((result) => {
        if (result.data.Status) {
          alert("admin edit successfully ");
          navigate("/dashboard");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    }else{
      axios
        .post("http://localhost:3000/auth/add_admin", payload)
        .then((result) => {
          if (result.data.Status) {
            alert("admin add successfully ");
            navigate("/dashboard");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Admin</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
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
                setEmail( e.target.value )
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setPassword( e.target.value )
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
