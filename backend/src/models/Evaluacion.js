const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evaluacion = sequelize.define('Evaluacion', {
  id_evaluacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_limite: {
    type: DataTypes.DATE,
    allowNull: false
  },
  porcentaje_calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM,
    values: ['pendiente', 'completada', 'completada con retraso'],
    defaultValue: 'pendiente',
    allowNull: false
  },
  enlace: {
    type: DataTypes.STRING,
    allowNull: true 
  },
}, {
  tableName: 'evaluaciones',
  timestamps: false
});

module.exports = Evaluacion;
