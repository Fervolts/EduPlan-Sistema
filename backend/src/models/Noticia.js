const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Noticia = sequelize.define('noticia',{

  Titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fecha:{
    type: DataTypes.DATE,
  },
  descripción: {
    type: DataTypes.TEXT,
    allowNull: false
  }

}, {
  tableName: 'noticia',
  timestamps: false,
});

module.exports = Noticia;