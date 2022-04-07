import _ from 'lodash';
import { User, UserRole } from '../models';

export const fillable = ['account', 'lastName', 'firstName', 'email', 'mobile'];

export const getUsers = async () => {
  return await User.findAndCountAll();
};

export const getUserWithRelations = async userId => {
  let [user, roles] = await Promise.all([User.findByPk(userId, { raw: true }), UserRole.findAll({ where: { userId }, raw: true })]);

  return {
    user,
    userRole: _.map(roles, ({ roleId }) => roleId),
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
