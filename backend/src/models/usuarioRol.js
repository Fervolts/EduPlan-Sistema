const  DataTypes  = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./estudiante');
const Profesor = require('./profesor');
const Administrador = require('./administrador');
const Rol = require('./rol');

const UsuarioRol = sequelize.define('UsuarioRol', {
  id_usuario_rol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'usuarios_Roles',
  timestamps: false,
});

UsuarioRol.belongsTo(Estudiante, { foreignKey: 'id_usuario' });
Estudiante.hasMany(UsuarioRol, { foreignKey: 'id_usuario' });

UsuarioRol.belongsTo(Profesor, { foreignKey: 'id_usuario' });
Profesor.hasMany(UsuarioRol, { foreignKey: 'id_usuario' });

UsuarioRol.belongsTo(Administrador, { foreignKey: 'id_usuario' });
Administrador.hasMany(UsuarioRol, { foreignKey: 'id_usuario' });

UsuarioRol.belongsTo(Rol, { foreignKey: 'id_rol' });
Rol.hasMany(UsuarioRol, { foreignKey: 'id_rol' });

module.exports = UsuarioRol;
