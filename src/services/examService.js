const { where } = require('sequelize');
const Exam = require('../models/examModel');
const Question = require('../models/questionModel');

const createExam = async (data) => {
  const exam = await Exam.create(data);
  return exam.exam_id;
};

const getExamById = async (exam_id) => {
  return await Exam.findByPk(exam_id, {
    include: [
      {
        model: Question,
        as: 'questions', 
        attributes: { exclude: ['answer'] }, 
      },
    ],
  });
};

// const getExamById = async (exam_id) => {
//   // return await Exam.findOne({where: {exam_id: exam_id}});
//   return await Exam.findByPk(exam_id, {
//     include: [{
//       model: Question,
//       as: 'questions',
//       where :{ exam_id: exam_id},
//       attributes: { exclude: ['answer'] }
//     }]
//   });
// };

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
