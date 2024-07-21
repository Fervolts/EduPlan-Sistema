const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./Estudiante');
const Materia = require('./Materia');

const Inscripcion = sequelize.define('Inscripcion', {
  id_inscripcion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Inscripciones',
  timestamps: false,
});

Inscripcion.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });
Inscripcion.belongsTo(Materia, { foreignKey: 'id_materia' });

module.exports = Inscripcion;
