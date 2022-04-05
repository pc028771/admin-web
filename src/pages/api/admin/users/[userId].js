import _ from 'lodash';
import { getUser, updateUser, fillable } from '../../../../repositories/user';

export default async function handler(req, res) {
  let {
      method,
      body,
      query: { userId },
    } = req,
    user = {};

  switch (method) {
    case 'PUT':
    case 'PATCH':
      user = await updateUser(userId, _.pick(body, fillable));
      if (!_.isObject(user)) {
        return res.status(404).send();
      }
      break;
    case 'DELETE':
      break;
    case 'GET':
      user = await getUser(userId);
      if (!_.isObject(user)) {
        return res.status(404).send();
      }
      return res.json(user);
  }

  return res.json(user);
}
