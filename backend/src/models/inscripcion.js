const  DataTypes  = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./estudiante');
const Materia = require('./materia');

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
  tableName: 'inscripciones',
  timestamps: false,
});

Inscripcion.belongsTo(Estudiante, { foreignKey: 'id_estudiante' });
Estudiante.hasMany(Inscripcion, { foreignKey: 'id_estudiante' });

Inscripcion.belongsTo(Materia, { foreignKey: 'id_materia' });
Materia.hasMany(Inscripcion, { foreignKey: 'id_materia' });

module.exports = Inscripcion;
