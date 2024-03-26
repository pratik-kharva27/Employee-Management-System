import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (!response) return res.json({ loginStatus: false, Error: "Wrong email or Password" });

            // console.log(err,response,"Asd");
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        // if(result[0].password == req.body.password){
        //   const email = result[0].email;
        //   const token = jwt.sign(
        //       { role: "employee", email: email, id: result[0].id },
        //       "jwt_secret_key",
        //       { expiresIn: "1d" }
        //   );
        //   res.cookie('token', token)
        //   return res.json({ loginStatus: true, id: result[0].id });
        // } 
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });

  router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
        return res.json(result)
    })
  })

  router.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: true });
  });

  router.post("/doneBtn", (req, res) => {
    let id
    console.log(req.body,"Asdasd");
    const getEmp = "SELECT * from employee Where email = ?";
    con.query(getEmp, [req.body.email], (err, result) => {
      if (result.length < 1) {
        return res.json({ Error: "No Employee Found" });
      }
      if (result.length > 0) {
        console.log(result,"Asdasd");
        id = result[0].id;
        // console.log(id, "hgs");
        const update = `UPDATE employee
              SET leave_status = 2
              WHERE id = ?`;
  
        con.query(update, id, (err, result) => {
          // console.log(result, "jhgjhg");
          if (err) return res.json({ Status: false, Error: "Query Error" + err });
        });
  
      }
    });
  });

  export {router as EmployeeRouter}