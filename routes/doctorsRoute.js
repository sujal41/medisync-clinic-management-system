const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('../utils/auth-middleware');
const { createDoctor, getOneDoctorData, getAllDoctors, updateDoctorRecord, deleteDoctorRecord } = require('../controllers/doctors');

const router = express.Router();
router.use(cors());

// add a new patient
router.post("/" , authenticateToken , createDoctor );

// get a specific Doctor's data created by a specific user
router.get("/:id" , authenticateToken , getOneDoctorData);

// get all doctors data 
router.get("/" , authenticateToken , getAllDoctors );

// put (update) detials of existing doctor data
router.put("/:id" , authenticateToken , updateDoctorRecord );

// delete a doctor record
router.delete("/:id" , authenticateToken ,  deleteDoctorRecord );

module.exports = router;