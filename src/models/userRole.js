'use strict';
const { Model } = require('sequelize');
const { User, Role } = require('.');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsTo(models.Role);
    }
  }

  UserRole.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: User,
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Role,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'userRole',
      timestamps: false,
      freezeTableName: true,
    },
  );

  return UserRole;
};
