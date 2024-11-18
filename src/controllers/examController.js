const examService = require('../services/examService');

const createExam = async (req, res) => {
  try {
    if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");

    const exam = await examService.createExam(req.body);
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    if (req.session.user.dataValues.type !== "Student") {
      throw new Error("Student not found");
    }
    
    const exam = await examService.getExamById(req.params.exam_id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const examStartTime = new Date(exam.start_time); 
    const examEndTime = new Date(exam.end_time);     

    const currentDateTime = new Date();

    const examDuration = examEndTime - examStartTime; 
    const remainingTime = examEndTime - currentDateTime; 
    let status;
    if (currentDateTime < examStartTime) {
      const timeUntilStart = examStartTime - currentDateTime;
      status = "Not Started";
    } else if (currentDateTime >= examStartTime && currentDateTime <= examEndTime) {
      status = "Ongoing";
    } else {
      status = "Ended";
    }

    const response = {
      exam,
      remainingTime, 
      duration: examDuration, 
      status, 
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateExam = async (req, res) => {
  try {
    if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");

    const exam = await examService.updateExam(req.params.exam_id, req.body);
    if (exam[0] > 0) {
      res.status(200).json({ message: 'Exam updated successfully' });
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");

    const rowsDeleted = await examService.deleteExam(req.params.exam_id);
    if (rowsDeleted) {
      res.status(200).json({ message: 'Exam deleted successfully' });
    } else {
      res.status(404).json({ error: 'Exam not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reviewExam = async (req, res) => {
  try {
    if (req.session.user.dataValues.type !== "Teacher") throw new Error("Teacher not found");

    const exam = await examService.getExamById(req.params.exam_id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const response = {
      exam
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createExam,
  getExam,
  updateExam,
  deleteExam,
  reviewExam
};
