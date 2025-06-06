const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Doctor = sequelize.define('Doctor', {
  doctorId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Doctor;
