const express = require('express');
const cors = require('cors');
const { signup } = require('../controllers/signup');
const login = require('../controllers/login');
const { authenticateToken } = require('../utils/auth-middleware');

const router = express.Router();


router.use(cors());

router.post("/register" , signup);
router.post("/login" , login);

module.exports = router;