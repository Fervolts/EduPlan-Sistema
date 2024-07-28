const express = require('express');
const app = express();
const sequelize = require('./src/config/database');
const routes = require('./src/routes/routes');
const cors = require('cors');
require('dotenv').config();


// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// //Importacion y configuración de relaciones
require('./src/models/association');

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try { 
    await sequelize.authenticate();
    console.log('Base de datos conectado exitosamente');
    await sequelize.sync(); // Sincroniza modelos con la base de datos
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto:${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Erro al intentar conectar a la base de datos:', error);
  }
};

startServer();
