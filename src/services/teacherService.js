// src/services/teacherService.js
const Teacher = require('../models/teacherModel');

const createTeacher = async (data) => {
  return await Teacher.create(data);
};

const getTeacherById = async (teacher_id) => {
  return await Teacher.findByPk(teacher_id);
};

const updateTeacher = async (teacher_id, data) => {
  return await Teacher.update(data, { where: { teacher_id } });
};

const deleteTeacher = async (teacher_id) => {
  return await Teacher.destroy({ where: { teacher_id } });
};

module.exports = {
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
