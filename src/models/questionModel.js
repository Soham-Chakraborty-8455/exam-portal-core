const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Exam = require('./examModel');

const Question = sequelize.define('Exam', {
  question_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  exam_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
        model: Exam, 
        key: 'exam_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Question;
