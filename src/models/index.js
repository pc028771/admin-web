'use strict';

const Sequelize = require('sequelize');
const _ = require('lodash');

const env = process.env.NODE_ENV || 'development';
const { [env]: config } = require('../database/config.json');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Role: require('./role')(sequelize, Sequelize.DataTypes),
  UserRole: require('./userRole')(sequelize, Sequelize.DataTypes),
  Privilege: require('./privilege')(sequelize, Sequelize.DataTypes),
};

_.forEach(db, model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = {
  sequelize,
  Sequelize,
  ...db,
};
