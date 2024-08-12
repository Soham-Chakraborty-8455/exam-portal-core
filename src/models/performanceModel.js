// src/models/performanceModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Exam = require('./examModel');
const Question = require('./questionModel');

const Performance = sequelize.define('Performance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  question_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Question,
      key: 'question_id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
  correct: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  marked_option: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// User.hasMany(Performance, { foreignKey: 'user_id', as: 'performances' });
// Performance.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Question.hasMany(Performance, { foreignKey: 'question_id', as: 'performances' });
// Performance.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

module.exports = Performance;
