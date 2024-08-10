// src/controllers/examController.js
const examService = require('../services/examService');

const createExam = async (req, res) => {
  try {
    const exam = await examService.createExam(req.body);
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.exam_id);
    if (exam) {
      res.status(200).json(exam);
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const exam = await examService.updateExam(req.params.exam_id, req.body);
    if (exam[0] > 0) {
      res.status(200).json({ message: 'Exam updated successfully' });
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const rowsDeleted = await examService.deleteExam(req.params.exam_id);
    if (rowsDeleted) {
      res.status(200).json({ message: 'Exam deleted successfully' });
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createExam,
  getExam,
  updateExam,
  deleteExam,
};
