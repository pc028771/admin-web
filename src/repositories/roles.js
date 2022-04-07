import _ from 'lodash';
import { Role, UserRole } from '../models';

export const getRoles = async userId => {
  return await Role.findAll({
    include: {
      model: UserRole,
      where: { userId },
      required: false,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
};
