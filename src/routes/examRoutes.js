// src/routes/examRoutes.js
const express = require('express');
const {
  createExam,
  getExam,
  updateExam,
  deleteExam,
} = require('../controllers/examController');
const router = express.Router();

router.post('/', createExam);
router.get('/:exam_id', getExam);
router.put('/:exam_id', updateExam);
router.delete('/:exam_id', deleteExam);

module.exports = router;
