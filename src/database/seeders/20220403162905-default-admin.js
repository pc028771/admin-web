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
          name: 'Admin',
          type: 'admin',
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
