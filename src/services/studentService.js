const Student = require('../models/studentModel');

export const createStudent = async (data) => {
  return await Student.create(data);
};

export const getStudentById = async (enrollment_number) => {
  return await Student.findByPk(enrollment_number);
};

