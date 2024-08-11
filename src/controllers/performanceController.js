// src/controllers/performanceController.js
const performanceService = require('../services/performanceService');

const calculateTotalMarks = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const { user_id } = req.session.user;

    const totalMarks = await performanceService.getTotalMarks(user_id, exam_id);

    res.status(200).json({ totalMarks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewAllPerformances = async (req, res) => {
  try {
    const { user_id } = req.session.user;

    const performances = await performanceService.getAllPerformancesByStudent(user_id);

    res.status(200).json(performances);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  calculateTotalMarks,
  viewAllPerformances,
};
