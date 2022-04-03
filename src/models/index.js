'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const { [env]: config } = require('../database/config.json');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

module.exports = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Role: require('./role')(sequelize, Sequelize.DataTypes),
  Privilege: require('./privilege')(sequelize, Sequelize.DataTypes),
};
