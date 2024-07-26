const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Noticia = sequelize.define('Noticia', {
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descripción: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Noticia;