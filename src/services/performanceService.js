const Performance = require('../models/performanceModel');
const { Op } = require('sequelize');

const getTotalMarks = async (user_id, exam_id) => {
  const performances = await Performance.findAll({
    where: { user_id, exam_id },
  });

  let totalMarks = 0;
  performances.forEach((performance) => {
    if (performance.correct) {
      totalMarks += performance.marks;
    } else {
      totalMarks -= performance.Question.negative;
    }
  });

  return totalMarks;
};

const getAllPerformancesByStudent = async (user_id) => {
  return await Performance.findAll({
    where: { user_id },
    include: ['exam', 'question'],
  });
};

module.exports = {
  getTotalMarks,
  getAllPerformancesByStudent,
};
