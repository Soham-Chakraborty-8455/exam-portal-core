// src/routes/examRoutes.js
const express = require('express');
const {
  createExam,
  getExam,
  updateExam,
  deleteExam,
  reviewExam,
} = require('../controllers/examController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/',authMiddleware, createExam);
router.get('/:exam_id',authMiddleware, getExam);
router.get('/set/review/:exam_id',authMiddleware, reviewExam);
router.put('/:exam_id',authMiddleware, updateExam);
router.delete('/:exam_id',authMiddleware, deleteExam);

module.exports = router;