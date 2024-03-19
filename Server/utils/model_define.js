const Admin = require("../Models/Admin");
const Category = require("../Models/Category");
const Employee = require("../Models/Employee");
const Manager = require("../Models/Manager");


Category.hasOne(Employee, {
    foreignKey: {
      name: 'category_id'
    }
  });
  Employee.belongsTo(Category);