const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db')

class Employee extends Model {}

Employee.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING

  },
  password: {
    type: DataTypes.STRING

  },
  salary: {
    type: DataTypes.STRING

  },
  address: {
    type: DataTypes.STRING

  },
  image: {
    type: DataTypes.STRING

  },
  category_id: {
    type: DataTypes.STRING

  }
}, {

  sequelize,
  modelName: 'Employee' 
});

module.exports = Employee