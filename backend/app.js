const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const router = require('./routes/index');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', router);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    await sequelize.sync(); // Sincronizar modelos
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
