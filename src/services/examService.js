const { where } = require('sequelize');
const Exam = require('../models/examModel');

const createExam = async (data) => {
  const exam = await Exam.create(data);
  return exam.exam_id;
};

const getExamById = async (exam_id) => {
  return await Exam.findOne({where: {exam_id: exam_id}});
  // return await Exam.findByPk(exam_id, {
  //   include: [{
  //     model: Question,
  //     as: 'questions' 
  //   }]
  // });
};

const updateExam = async (exam_id, data) => {
  return await Exam.update(data, { where: { exam_id: exam_id } });
};

const deleteExam = async (exam_id) => {
  return await Exam.destroy({ where: { exam_id: exam_id } });
};

module.exports = {
  createExam,
  getExamById,
  updateExam,
  deleteExam,
};
