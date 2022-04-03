import _ from 'lodash';
import { users, fields } from '../../../../repositories/user';

export default function handler(req, res) {
  let {
      method,
      query: { userId },
    } = req,
    predicate = { id: parseInt(userId) },
    user;

  switch (method) {
    case 'GET':
      user = _.find(users, predicate);
      if (!_.isObject(user)) {
        return res.status(404).send();
      }
      break;
    case 'PUT':
    case 'PATCH':
      let userIndex = _.findIndex(users, predicate);
      if (userIndex === -1) {
        return res.status(404).send();
      }

      let data = _.pick(body, fields);
      user = _.merge(users[userIndex], data);
      break;
    case 'DELETE':
      _.remove(users, predicate);
      return res.json(users);
  }

  return res.json(user);
}
