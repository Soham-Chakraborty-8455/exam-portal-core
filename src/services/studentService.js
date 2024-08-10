const Student = require('../models/studentModel');

const createStudent = async (data) => {
  return await Student.create(data);
};

const getStudentById = async (enrollment_number) => {
  return await Student.findByPk(enrollment_number);
};

module.exports = {
  createStudent,
  getStudentById
};
