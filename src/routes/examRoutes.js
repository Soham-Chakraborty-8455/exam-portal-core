// src/routes/examRoutes.js
const express = require('express');
const {
  createExam,
  getExam,
  updateExam,
  deleteExam,
} = require('../controllers/examController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/',authMiddleware, createExam);
router.get('/:exam_id',authMiddleware, getExam);
router.put('/:exam_id',authMiddleware, updateExam);
router.delete('/:exam_id',authMiddleware, deleteExam);

module.exports = router;
