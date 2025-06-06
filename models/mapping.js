const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Patient = require('./patient');
const Doctor = require('./doctor');
const User = require('./user');

const Mapping = sequelize.define('PatientDoctorMapping', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  assignedDateTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Mapping.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
// Mapping.belongsTo(Doctor, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
// Mapping.belongsTo(User, { foreignKey: 'assignedBy', onDelete: 'SET NULL' });

module.exports = Mapping;
