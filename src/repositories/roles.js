import _ from 'lodash';
import { Role } from '../models';

export const getRoles = async () => {
  return await Role.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
};
