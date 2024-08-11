// src/models/examModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Question = require('./questionModel');

const Exam = sequelize.define('Exam', {
  exam_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  exam_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  }
});

Exam.hasMany(Question, { 
  foreignKey: 'exam_id', 
  sourceKey: 'exam_id',
  as: 'questions'  
});

Question.belongsTo(Exam, {
  foreignKey: 'exam_id',
  targetKey: 'exam_id',
  as: 'exam'
});

module.exports = Exam;
