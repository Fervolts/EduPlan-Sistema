const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./Estudiante');
const Evaluacion = require('./Evaluacion');

const EvaluacionesEstudiantes = sequelize.define('EvaluacionesEstudiantes', {
  id_estudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Estudiante, // referencia al modelo Estudiante
      key: 'id_estudiante',
    }
  },
  id_evaluacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Evaluacion, // referencia al modelo Evaluacion
      key: 'id_evaluacion',
    }
  },
  calificacion: {
    type: DataTypes.FLOAT,
    allowNull: true,
  }
}, {
  tableName: 'evaluacionestudiante',
  timestamps: false,
});

module.exports = EvaluacionesEstudiantes;
