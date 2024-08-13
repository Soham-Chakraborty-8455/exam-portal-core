// src/routes/performanceRoutes.js
const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');
const authMiddleware = require('../middleware/auth');

router.get('/',authMiddleware, performanceController.viewAllPerformances);
router.get('/total-marks/:exam_id',authMiddleware, performanceController.calculateTotalMarks);
router.get('/:exam_id',authMiddleware, performanceController.createPerformanceEntry);

module.exports = router;
