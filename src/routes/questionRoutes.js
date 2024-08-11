const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, questionController.createQuestion);
router.put('/:question_id', authMiddleware, questionController.updateQuestion);
router.delete('/:question_id', authMiddleware, questionController.deleteQuestion);

module.exports = router;
