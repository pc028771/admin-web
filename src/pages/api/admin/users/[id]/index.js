import _ from 'lodash';
import { getUserWithRelations, updateUser, fillable } from '../../../../../repositories/users';

export default async function handler(req, res) {
  let {
      method,
      body,
      query: { id },
    } = req,
    user = {};

  switch (method) {
    case 'PUT':
    case 'PATCH':
      user = await updateUser(id, _.pick(body, fillable));
      if (!_.isObject(user)) {
        return res.status(404).send();
      }
      break;
    case 'GET':
      user = await getUserWithRelations(id);
      if (!_.isObject(user)) {
        return res.status(404).send();
      }
      break;
    case 'DELETE':
      break;
  }

  return res.json(user);
}
