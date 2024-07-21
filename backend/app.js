const express = require('express');
const app = express();
const sequelize = require('./src/config/database');
const routes = require('./src/routes/routes');
require('dotenv').config();
const cors = require('cors');

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync(); // Sincroniza modelos con la base de datos
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
