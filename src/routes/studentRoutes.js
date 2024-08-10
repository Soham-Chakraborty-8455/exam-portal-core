const express = require('express');
const { createStudent, getStudent } = require('../controllers/studentController');
const router = express.Router();

router.post('/signup', createStudent);
router.get('/:enrollment_number', getStudent);

module.exports = router;
