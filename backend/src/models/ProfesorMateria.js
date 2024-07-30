// models/ProfesorMateria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta según tu configuración

const ProfesorMateria = sequelize.define('ProfesorMateria', {
  id_profesor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'ProfesorMateria',
  timestamps: false,
});

module.exports = ProfesorMateria;
