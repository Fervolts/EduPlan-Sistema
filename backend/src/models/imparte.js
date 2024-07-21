const  DataTypes  = require('sequelize');
const sequelize = require('../config/database');
const Profesor = require('./profesor');
const Materia = require('./materia');

const Imparte = sequelize.define('Imparte', {
  id_imparte: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_profesor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'imparte',
  timestamps: false,
});

Imparte.belongsTo(Profesor, { foreignKey: 'id_profesor' });
Profesor.hasMany(Imparte, { foreignKey: 'id_profesor' });

Imparte.belongsTo(Materia, { foreignKey: 'id_materia' });
Materia.hasMany(Imparte, { foreignKey: 'id_materia' });

module.exports = Imparte;
