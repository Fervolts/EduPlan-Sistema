const  DataTypes  = require('sequelize');
const sequelize = require('../config/database');
const Materia = require('./materia');

const Evaluacion = sequelize.define('Evaluacion', {
  id_evaluacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_limite: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  porcentaje_calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: 'evaluaciones',
  timestamps: false,
});

Evaluacion.belongsTo(Materia, { foreignKey: 'id_materia' });
Materia.hasMany(Evaluacion, { foreignKey: 'id_materia' });

module.exports = Evaluacion;
