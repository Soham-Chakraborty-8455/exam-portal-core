const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const examRoutes = require('./routes/examRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
