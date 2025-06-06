const { Mapping, Patient, Doctor, User } = require('../models');

async function assignDoctorToPatient ({ patientId, doctorId, assignedBy })  {
  try {
    return await Mapping.create({ patientId, doctorId, assignedBy });
  } catch (error) {
    console.log(error);
  }
};

async function getAllMappings ()  {
  return await Mapping.findAll({
    include: [
      { model: Patient },
      { model: Doctor }
    ]
  });
};

async function getMappingsByPatientId (patientId)  {
  return await Mapping.findAll({
    where: { patientId },
    include: [
      { model: Doctor }
    ]
  });
};

async function deleteMapping (id)  {
  const mapping = await Mapping.findByPk(id);
  if (!mapping) return null;
  await mapping.destroy();
  return mapping;
};

module.exports = {
  assignDoctorToPatient,
  getAllMappings,
  getMappingsByPatientId,
  deleteMapping
};

