// src/routes/teacherRoutes.js
const express = require('express');
const {
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');
const router = express.Router();

router.post('/', createTeacher);
router.get('/:teacher_id', getTeacher);
router.put('/:teacher_id', updateTeacher);
router.delete('/:teacher_id', deleteTeacher);

module.exports = router;
