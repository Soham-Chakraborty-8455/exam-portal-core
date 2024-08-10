const studentService = require('../services/studentService');

const createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.enrollment_number);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  getStudent
};
