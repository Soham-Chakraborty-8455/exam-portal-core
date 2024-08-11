// src/routes/performanceRoutes.js
const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');

router.get('/', performanceController.viewAllPerformances);
router.get('/total-marks/:exam_id', performanceController.calculateTotalMarks);

module.exports = router;
