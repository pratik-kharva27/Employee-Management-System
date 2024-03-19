import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employeems"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;


// const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize('employeems', 'root', '', {
//   host: 'localhost',
//   dialect:  'mysql'
// });


// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }


// module.exports = sequelize