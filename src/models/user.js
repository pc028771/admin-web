'use strict';

import _ from 'lodash';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, { through: models.UserRole, timestamps: false });
      this.hasMany(models.UserRole);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
      },
      emailVerified: {
        type: DataTypes.DATE,
        field: 'email_verified',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'users',
      freezeTableName: true,
    },
  );

  return User;
};
