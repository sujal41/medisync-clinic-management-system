const sequelize = require('../config/dbConfig');

const User = require('./user');
const Doctor = require('./doctor');
const Patient = require('./patient');
const Mapping = require('./mapping');

// Associations
Patient.belongsTo(User, { foreignKey: 'assignedBy' });
Patient.belongsTo(Doctor, { foreignKey: 'doctorId' });
Mapping.belongsTo(Patient, { foreignKey: 'patientId' });
Mapping.belongsTo(Doctor, { foreignKey: 'doctorId' });
Mapping.belongsTo(User, { foreignKey: 'assignedBy' });

module.exports = {
  sequelize,
  User,
  Doctor,
  Patient,
  Mapping
};
