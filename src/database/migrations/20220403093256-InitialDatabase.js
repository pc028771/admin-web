'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(320),
        allowNull: false,
        unique: true,
      },
      name: Sequelize.STRING(32),
      email: {
        type: Sequelize.STRING(320),
        allowNull: false,
      },
      emailVerified: {
        type: Sequelize.DATE,
        field: 'email_verified',
      },
      hash: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      image: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(['user', 'employee', 'manager', 'admin']),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('privileges', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM(['page', 'api', 'action']),
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('userRole', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    });
    await queryInterface.createTable('rolePrivilege', {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      privilegeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'privileges',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      acl: {
        type: Sequelize.ARRAY(Sequelize.ENUM(['POST', 'GET', 'DELETE', 'PATCH'])),
        defaultValue: Sequelize.literal(`ARRAY['GET']::"enum_rolePrivilege_acl"[]`),
        allowNull: false,
      },
    });
    await queryInterface.createTable('accounts', {
      compoundId: {
        type: Sequelize.STRING,
        field: 'compound_id',
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      providerType: {
        type: Sequelize.STRING,
        field: 'provider_type',
      },
      providerId: {
        type: Sequelize.STRING,
        field: 'provider_id',
      },
      providerAccountId: {
        type: Sequelize.STRING,
        field: 'provider_account_id',
      },
      refreshToken: {
        type: Sequelize.STRING,
        field: 'refresh_token',
      },
      accessToken: {
        type: Sequelize.STRING,
        field: 'access_token',
      },
      accessTokenExpires: {
        type: Sequelize.DATE,
        field: 'access_token_expires',
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
    await queryInterface.createTable('sessions', {
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      expires: {
        type: Sequelize.DATE,
      },
      sessionToken: {
        type: Sequelize.STRING,
        field: 'session_token',
        unique: true,
      },
      accessToken: {
        type: Sequelize.STRING,
        field: 'access_token',
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
    await queryInterface.createTable('verification_requests', {
      identitifer: Sequelize.STRING,
      token: {
        type: Sequelize.STRING,
        unique: true,
      },
      expires: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users', { cascade: true });
    await queryInterface.dropTable('roles', { cascade: true });
    await queryInterface.dropTable('userRole', { cascade: true });
    await queryInterface.dropTable('privileges', { cascade: true });
    await queryInterface.dropTable('rolePrivilege', { cascade: true });
  },
};
