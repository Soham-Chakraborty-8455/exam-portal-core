// src/models/examModel.js
const { DataTypes } = require('sequelize');
const Question = require('./questionModel');
const sequelize = require('../utils/db');

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
  },
  
});

Exam.hasMany(Question, {
  foreignKey: 'exam_id',
  as: 'questions', 
});


module.exports = Exam;
