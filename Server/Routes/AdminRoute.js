import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ?";
  con.query(sql, [req.body.email], async (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    // console.log(req.body.email, result, "UUUU");
    if (result.length > 0) {
      // Compare the plaintext password with the hashed password
      const match = await bcrypt.compare(req.body.password, result[0].password);
      if (match) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true });
      } else {
        return res.json({
          loginStatus: false,
          Error: "wrong email or password",
        });
      }
    } else {
      return res.json({ loginStatus: false, Error: "Email not found" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
// end imag eupload

router.post("/add_employee", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id) 
    VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  // console.log("adas");
  const id = req.params.id;
  const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
    req.body.category_id,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_admin", (req, res) => {
  const sql = `INSERT INTO admin 
    (email,password) 
    VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [req.body.email, hash];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE admin SET email = ? WHERE id = ?`;
  const sql2 = `UPDATE admin SET email = ?, password = ? WHERE id = ?`;

  if (req.body.email && req.body.password === "") {
    con.query(sql, [req.body.email, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  } else if (req.body.email && req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return res.json({ Status: false, Error: "Hashing Error" + err });
      con.query(sql2, [req.body.email, hash, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true });
      });
    });
  } else {
    return res.json({ Status: false, Error: "No update parameters provided" });
  }
});

router.delete("/delete_admin/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from admin where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/manager_count", (req, res) => {
  const sql = "select count(id) as manager from manager";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = "select * from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

router.get("/getAdminbyId/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from admin Where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result[0] });
  });
});

router.get("/manager", (req, res) => {
  const sql = "SELECT * FROM manager";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/manager/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM manager WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_manager", upload.single("image"), (req, res) => {
  const sql = `INSERT INTO manager 
    (name,email,password, address, salary,image) 
    VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
    ];
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

router.put("/edit_manager/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE manager 
        set name = ?, email = ?, salary = ?, address = ?
        WHERE id = ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.salary,
    req.body.address,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_manager/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from manager where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_Leave", (req, res) => {
  let id;
  const getEmp = "SELECT * from employee Where email = ?";
  con.query(getEmp, [req.body.email], (err, result) => {
    if (result.length < 1) {
      return res.json({ Error: "No Employee Found" });
    }
    if (result.length > 0) {
      id = result[0].id;
      // console.log(id, "hgs");
      const update = `UPDATE employee
            SET applied_leave = 1 , btnVisible = 1
            WHERE id = ?`;

      con.query(update, id, (err, result) => {
        // console.log(result, "jhgjhg");
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
      });

      const sql = `INSERT INTO leave_request 
            (name,email,startDate,endDate,reason) 
            VALUES (?)`;

      if (err) return res.json({ Status: false, Error: "Query Error" });
      const values = [
        req.body.name,
        req.body.email,
        req.body.startDate,
        req.body.endDate,
        req.body.reason,
      ];
      con.query(sql, [values], (err, rest) => {
        if (err) return res.json({ Status: false, Error: err });
        return res.json({ Status: true, id: id });
      });
    }
  });
});

router.post("/leave_Status", (req, res) => {
  let update;
  if (req.body.status == "approve") {
    update = `UPDATE employee
        SET leave_status = 1, btnVisible = 0
        WHERE id = ?`;
  } else if (req.body.status == "disapprove") {
    update = `UPDATE employee
        SET leave_status = 0 , btnVisible = 0
        WHERE id = ?`;
  }
  let id;
  const getEmp = "SELECT * from employee WHERE email = ?";
  con.query(getEmp, [req.body.email], (err, result) => {
    if (result.length < 1) {
      return res.json({ Error: "No Employee Found" });
    }
    if (result.length > 0) {
      id = result[0].id;
      con.query(update, id, (err, result) => {
        if(result){
          
          res.json({ Status: true, msg: "Status Updated" });
        }
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
      });
    }
    else{
      return err
    }
  });
});


router.delete("/delete_category/:id", (req, res) => {
  const id = req.params.id;
  
  const sql = "delete from category where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});




export { router as adminRouter };
