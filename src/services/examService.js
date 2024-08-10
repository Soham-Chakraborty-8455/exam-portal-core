// src/services/examService.js
const Exam = require('../models/examModel');

const createExam = async (data) => {
  return await Exam.create(data);
};

const getExamById = async (exam_id) => {
  return await Exam.findByPk(exam_id);
};

const updateExam = async (exam_id, data) => {
  return await Exam.update(data, { where: { exam_id } });
};

const deleteExam = async (exam_id) => {
  return await Exam.destroy({ where: { exam_id } });
};

module.exports = {
  createExam,
  getExamById,
  updateExam,
  deleteExam,
};
