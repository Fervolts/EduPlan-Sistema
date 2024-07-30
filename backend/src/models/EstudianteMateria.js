// models/EstudianteMateria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta según tu configuración

const EstudianteMateria = sequelize.define('EstudianteMateria', {
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'EstudianteMateria',
  timestamps: false,
});

module.exports = EstudianteMateria;
