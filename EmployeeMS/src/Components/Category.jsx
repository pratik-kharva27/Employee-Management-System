import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState([]);

  const getcategory = ()=>{
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
  }

  useEffect(() => {
    getcategory()
  }, []);

  const deleteCategory=(e)=>{
    axios
    .delete(`http://localhost:3000/auth/delete_category/${e.id}`)
    .then((result) => {
      // console.log(result,"asdf");
        getcategory()

    })
    .catch((err) => console.log(err));
  }



  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Cetegory List</h3>
      </div>
      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Cetegory
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr>
                <td>{c.name}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteCategory(c);
                    }}
                    className="btn btn-warning btn-sm"
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

export default Category;
