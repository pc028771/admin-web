'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.bulkInsert('users', [
        {
          id: 1,
          username: 'pc028771@gmail.com',
          name: 'Howard Yang',
          email: 'pc028771@gmail.com',
          hash: 'f01ee48070e5538c834cb35d1c9c67863aef20ede75b7531b3a17467b40e00ff',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          username: 'noel@novize.com.tw',
          name: 'Noel Hsu',
          email: 'noel@novize.com.tw',
          hash: '',
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
      queryInterface.bulkInsert('privileges', [
        {
          id: 1,
          type: 'page',
          key: '/admin/users',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          type: 'page',
          key: '/admin/roles',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          type: 'page',
          key: '/admin/privileges',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);

    return await Promise.all([
      queryInterface.bulkInsert('userRole', [
        {
          userId: 1,
          roleId: 1,
        },
        {
          userId: 1,
          roleId: 2,
        },
      ]),
      queryInterface.bulkInsert('rolePrivilege', [
        {
          roleId: 1,
          privilegeId: 1,
          acl: Sequelize.literal(`ARRAY['GET','POST','PATCH','DELETE']::"enum_rolePrivilege_acl"[]`),
        },
        {
          roleId: 1,
          privilegeId: 2,
          acl: Sequelize.literal(`ARRAY['GET','POST','PATCH','DELETE']::"enum_rolePrivilege_acl"[]`),
        },
        {
          roleId: 1,
          privilegeId: 3,
          acl: Sequelize.literal(`ARRAY['GET','POST','PATCH','DELETE']::"enum_rolePrivilege_acl"[]`),
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
