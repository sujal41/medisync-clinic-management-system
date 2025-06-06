const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Doctor = require('./doctor');
const User = require('./user');

const Patient = sequelize.define('Patient', {
  patientId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disease: {
    type: DataTypes.TEXT, // long sentence
    allowNull: false
  },
  queryDateTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  assignedDateTime: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

// Relationships
Patient.belongsTo(Doctor, {
  foreignKey: 'doctorId',
  onDelete: 'SET NULL'
});

Patient.belongsTo(User, {
  foreignKey: 'assignedBy', // user who assigned the patient
  onDelete: 'SET NULL'
});

module.exports = Patient;
