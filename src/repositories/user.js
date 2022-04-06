import _ from 'lodash';
import { User, Role } from '../models';

export const fillable = ['account', 'lastName', 'firstName', 'email', 'mobile'];

export const getUsers = async () => {
  return await User.findAndCountAll();
};

export const getUser = async id => {
  return await User.findByPk(id, { include: Role });
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
  newUser = _.pick(newUser, fillable);
  let [affectedRows, user] = await User.update(newUser, { where: { id }, raw: true, returning: true });
  return user[0];
};
