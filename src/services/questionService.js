const Question = require("../models/questionModel");


const createQuestion = async (data) => {
  const question= await Question.create(data);
  return question.question_id;
};

const getQuestionById = async (question_id) => {
  return await Question.findOne({where: {question_id: question_id}});
};

const updateQuestion = async (question_id, data) => {
  return await Question.update(data, { where: { question_id: question_id } });
};

const deleteQuestion = async (question_id) => {
  return await Question.destroy({ where: { question_id: question_id } });
};

// const viewQuestion = async (exam_id)=>{
//   return await Question.findAll({ where: { exam_id:exam_id }});
// }

module.exports = {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  // viewQuestion
};
