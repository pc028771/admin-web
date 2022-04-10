import _ from 'lodash';
import { User, UserRole, sequelize } from '../models';

export const fillable = ['account', 'lastName', 'firstName', 'email', 'mobile'];

export const getUsers = async () => {
  return await User.findAndCountAll();
};

export const getUserWithRelations = async userId => {
  let [user, userRole] = await Promise.all([
    User.findByPk(userId),
    UserRole.findAll({
      where: { userId },
      attributes: {
        include: ['roleId'],
      },
    }),
  ]);

  return {
    user,
    userRole: _.map(userRole, ({ roleId }) => roleId),
  };
};

export const getUserRole = async id => {
  return await UserRole.findAll({ where: { userId: id } });
};

export const createUser = async newUser => {
  let { account } = newUser;
  const [user, isCreated] = await User.findOrCreate({
    where: { account },
    defaults: _.pick(newUser, fillable),
  });

  if (!isCreated) {
    return null;
  }

  return user;
};

export const updateUser = async (id, newUser) => {
  let value = _.pick(newUser, fillable);
  let [affectedRows, user] = await User.update(value, {
    where: { id },
    raw: true,
    returning: true,
  });

  return user[0];
};

export const getUserPrivileges = async ({ userId }) => {
  let rows = await sequelize.query(
    `
  SELECT p."type", p."key", rp."acl"
  FROM "userRole" ur
  JOIN "rolePrivilege" rp ON ur."roleId" = rp."roleId"
  JOIN "privileges" p ON rp."privilegeId" = p."id"
  WHERE ur."userId" = :userId
  `,
    {
      type: sequelize.QueryTypes.SELECT,
      replacements: { userId },
    },
  );

  return _.reduce(
    rows,
    (data, { type, key, acl }) => {
      let path = `${type}.${key}`;
      let val = _.get(data, path, []);
      val = _.uniq(acl.concat(val));
      return _.set(data, path, val);
    },
    {},
  );
};
