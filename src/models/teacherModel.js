// src/models/teacherModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Teacher = sequelize.define('Teacher', {
  teacher_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),  // Store subjects as an array of strings
    allowNull: false,
  },
});

module.exports = Teacher;
