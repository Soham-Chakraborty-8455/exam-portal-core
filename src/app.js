const express = require('express');
const examRoutes = require('./routes/examRoutes');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const sessionMiddleware = require('./utils/session');

const app = express();

app.use(express.json());
app.use(sessionMiddleware);

app.use('/api/exams', examRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
