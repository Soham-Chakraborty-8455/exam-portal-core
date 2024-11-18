const questionService = require('../services/questionService');

const createQuestion = async (req, res) => {
    try {
      if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");
  
      const question_id = await questionService.createQuestion(req.body);
      res.status(201).json(question_id);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateQuestion = async (req, res) => {
    try {
      if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");
  
      const question = await questionService.updateQuestion(req.params.question_id, req.body);
      if (question[0] > 0) {
        res.status(200).json({ message: 'Question updated successfully' });
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteQuestion = async (req, res) => {
    try {
      if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");
  
      const rowsDeleted = await questionService.deleteQuestion(req.params.question_id);
      if (rowsDeleted) {
        res.status(200).json({ message: 'Question deleted successfully' });
      } else {
        res.status(404).json({ error: 'Question not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const viewQuestion = async (req, res) => {
    try {
      if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");
      const questions = await questionService.viewQuestion(req.params.exam_id);
      res.status(201).json(questions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    viewQuestion
  };
  