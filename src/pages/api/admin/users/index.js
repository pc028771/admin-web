import _ from 'lodash';
import { users, fields } from '../../../../repositories/user';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      let body = _.defaults(req.body, {});
      let newId = Math.max(...users.map(({ id }) => parseInt(id))) + 1;
      let newUser = _.pick(body, fields);

      users.push({ id: newId, ...newUser });
      break;
  }

  return res.json(users);
}
