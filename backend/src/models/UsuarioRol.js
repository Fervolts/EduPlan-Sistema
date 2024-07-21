const  DataTypes  = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./Estudiante');
const Profesor = require('./Profesor');
const Administrador = require('./Administrador');
const Rol = require('./Rol');

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
  tableName: 'Usuarios_Roles',
  timestamps: false,
});

UsuarioRol.belongsTo(Estudiante, { foreignKey: 'id_usuario', constraints: false });
UsuarioRol.belongsTo(Profesor, { foreignKey: 'id_usuario', constraints: false });
UsuarioRol.belongsTo(Administrador, { foreignKey: 'id_usuario', constraints: false });
UsuarioRol.belongsTo(Rol, { foreignKey: 'id_rol' });

module.exports = UsuarioRol;
