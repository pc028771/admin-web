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
      account: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(320),
        allowNull: false,
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
