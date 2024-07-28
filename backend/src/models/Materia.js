const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Materia = sequelize.define('Materia', {
  id_materia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_materia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Materias',
  timestamps: false
});

module.exports = Materia;
