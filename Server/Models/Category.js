const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db')

class Category extends Model {}

Category.init({

  email: {
    type: DataTypes.STRING

  },
  password: {
    type: DataTypes.STRING

  },
  
}, {

  sequelize,
  modelName: 'Category' 
});

module.exports = Category