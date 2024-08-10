// src/controllers/teacherController.js
const teacherService = require('../services/teacherService');

const createTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.teacher_id);
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacher(req.params.teacher_id, req.body);
    if (teacher[0] > 0) {
      res.status(200).json({ message: 'Teacher updated successfully' });
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const rowsDeleted = await teacherService.deleteTeacher(req.params.teacher_id);
    if (rowsDeleted) {
      res.status(200).json({ message: 'Teacher deleted successfully' });
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTeacher,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};
