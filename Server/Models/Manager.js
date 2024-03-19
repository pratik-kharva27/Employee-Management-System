const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db')

class Manager extends Model {}

Manager.init({
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

}, {

  sequelize,
  modelName: 'Manager' 
});

module.exports = Manager