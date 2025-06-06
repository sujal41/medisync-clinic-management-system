const mappingService = require('../services/mapping');

async function assignDoctor (req, res) {
  try {
    const { patientId, doctorId, assignedBy } = req.body;
    if (!patientId || !doctorId || !assignedBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const mapping = await mappingService.assignDoctorToPatient({ patientId, doctorId, assignedBy });
    res.status(201).json(mapping);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getAllMappings (req, res) {
  try {
    const mappings = await mappingService.getAllMappings();
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getMappingsByPatientId (req, res) {
  try {
    const { patientId } = req.params;
    const mappings = await mappingService.getMappingsByPatientId(patientId);
    res.json(mappings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function removeMapping (req, res) {
  try {
    const { id } = req.params;
    const mapping = await mappingService.deleteMapping(id);
    if (!mapping) return res.status(404).json({ message: 'Mapping not found' });
    res.json({ message: 'Mapping deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    assignDoctor , getAllMappings , 
    getMappingsByPatientId , removeMapping
}