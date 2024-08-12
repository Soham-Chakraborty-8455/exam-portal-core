const app = require('./src/app');
const Exam = require('./src/models/examModel');
const Question = require('./src/models/questionModel');
const Performance= require('./src/models/performanceModel');
const User = require('./src/models/userModel');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await User.sync({ force: false });
    console.log("User table created!");
    
    await Exam.sync({ force: false });
    console.log("Exam table created!");

    await Question.sync({ force: false });
    console.log("Question table created!");

    await Performance.sync({ force: false });
    console.log("Performance table created!");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
})();