const Performance = require('../models/performanceModel');
const Question = require('../models/questionModel');

const getTotalMarks = async (user_id, exam_id) => {
  const performances = await Performance.findAll({
    where: { user_id: user_id, exam_id: exam_id },
  });

  let totalMarks = 0;
  performances.forEach((performance) => {
    totalMarks += performance.marks
  });
  return totalMarks;
};

const createPerformanceEntry = async (user_id, exam_id, marked_option, question_id) => {
  const question= await Question.findOne({where : {question_id: question_id}});
  const correct = question.answer==marked_option;
  let marks;
  if(marked_option== null) marks= 0;
  else marks= correct?question.marks: (0- question.negative);
  const data= {
    user_id,
    question_id,
    exam_id,
    marked_option,
    correct,
    marks
  }
  const performance= await Performance.create(data);
  return performance.id;
};

const getAllPerformancesByStudent = async (user_id) => {
  return await Performance.findAll({
    where: { user_id: user_id },
    include: ['exam', 'question'],
  });
};

module.exports = {
  getTotalMarks,
  getAllPerformancesByStudent,
  createPerformanceEntry
};
