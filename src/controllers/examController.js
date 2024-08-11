const examService = require('../services/examService');

const createExam = async (req, res) => {
  try {
    if (req.user.type !== "Teacher") throw new Error("Teacher not found");

    const exam = await examService.createExam(req.body);
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getExam = async (req, res) => {
  try {
    if (req.user.type !== "Student") throw new Error("Student not found");

    const exam = await examService.getExamById(req.params.exam_id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const examStartTime = exam.exam_starttime;
    const examStartDate = exam.exam_startdate; 
    const examDuration = exam.exam_duration * 60 * 1000; 

    const currentDateTime = new Date();

    const currDate = currentDateTime.toISOString().split('T')[0];
    const currTime = currentDateTime.toTimeString().split(' ')[0];

    let ms;
    let flag;

    if (examStartDate === currDate) {
      const diff = new Date(`2000-01-01T${examStartTime}`) - new Date(`2000-01-01T${currTime}`);
      ms = diff;
    } else {
      const dateDiff = new Date(examStartDate) - new Date(currDate);
      const timeDiff = new Date(`2000-01-01T${examStartTime}`) - new Date(`2000-01-01T${currTime}`);
      ms = dateDiff + timeDiff;
    }
    if (new Date(`2000-01-01T${examStartTime}`) >= new Date(`2000-01-01T${currTime}`)) {
      flag = "Positive";
    } else {
      flag = "Negative";
    }

    const response = {
      exam,
      remainingTime: ms,
      duration: examDuration,
      difference: flag,
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateExam = async (req, res) => {
  try {
    if (req.user.type !== "Teacher") throw new Error("Teacher not found");

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
    if (req.user.type !== "Teacher") throw new Error("Teacher not found");

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

module.exports = {
  createExam,
  getExam,
  updateExam,
  deleteExam,
};
