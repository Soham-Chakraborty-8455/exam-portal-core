const app = require('./src/app');
const sequelize = require('./src/utils/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
