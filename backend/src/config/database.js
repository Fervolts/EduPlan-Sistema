const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.BD_USER, process.env.BD_PASS, {
  host: process.env.HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,
  timezone: '-04:00',
});

module.exports = sequelize;
