const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Student = sequelize.define('Student', {
  enrollment_number: {
    type: DataTypes.BIGINT,
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
});

module.exports = Student;
