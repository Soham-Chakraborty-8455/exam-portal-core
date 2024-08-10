// src/models/examModel.js
const { DataTypes } = require('sequelize');
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
  questions: {
    type: DataTypes.JSONB,  // Store questions as JSON
    allowNull: false,
  },
});

module.exports = Exam;
