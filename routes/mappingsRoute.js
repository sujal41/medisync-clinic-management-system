const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('../utils/auth-middleware');
const { assignDoctor, getAllMappings, getMappingsByPatientId, removeMapping } = require('../controllers/mappings');

const router = express.Router();
router.use(cors());

// assign a doctor to a patient
router.post("/" , authenticateToken , assignDoctor );
// get all patient doctor mappings
router.get('/', authenticateToken , getAllMappings);
// get patient-doctor mappings by patientId
router.get('/:patientId', authenticateToken , getMappingsByPatientId);
// delete a patient-doctor mapping
router.delete('/:id', authenticateToken , removeMapping);

module.exports = router;