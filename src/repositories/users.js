import _ from 'lodash';
import { User, UserRole } from '../models';

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
