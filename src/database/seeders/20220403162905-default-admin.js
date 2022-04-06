'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      queryInterface.bulkInsert('users', [
        {
          id: 1,
          account: 'pc028771@gmail.com',
          firstName: 'Howard',
          lastName: 'Yang',
          email: 'pc028771@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          account: 'noel@novize.com.tw',
          firstName: 'Noel',
          lastName: 'Hsu',
          email: 'noel@novize.com.tw',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
      queryInterface.bulkInsert('roles', [
        {
          id: 1,
          name: '管理員',
          key: 'admin',
          type: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: '董事長',
          key: 'chairman',
          type: 'manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: '協理',
          key: 'director',
          type: 'manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: '業管經理',
          key: 'seniorManager',
          type: 'manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: '財務管理',
          key: 'finance',
          type: 'manager',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await Promise.all([
      queryInterface.bulkDelete('users', null, {}),
      queryInterface.bulkDelete('roles', null, {}),
      queryInterface.bulkDelete('privileges', null, {}),
    ]);
  },
};
