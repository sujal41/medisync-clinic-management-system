const express = require('express');
const cors = require('cors');
const { createPatient, getAllPatients, getOnePatientData, updatePatientRecord, deletePatientRecord } = require('../controllers/patients');
const { authenticateToken } = require('../utils/auth-middleware');


const router = express.Router();
router.use(cors());

// add a new patient
router.post("/" , authenticateToken , createPatient );

// get a specific patient's data created by a specific user
router.get("/:id" , authenticateToken , getOnePatientData);

// get all patients data created by a specific user
router.get("/" , authenticateToken , getAllPatients );

// put (update) detials of existing patient data
router.put("/:id" , authenticateToken , updatePatientRecord );

// delete a patient record
router.delete("/:id" , authenticateToken ,  deletePatientRecord);


module.exports = router;