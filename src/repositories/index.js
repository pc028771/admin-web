import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('novize', 'novize', '1qaz@WSX', {
  host: 'localhost',
  dialect: 'postgres',
});
