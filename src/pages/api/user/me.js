// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import _ from 'lodash';
import { users } from '../../../repositories/user';

export default function handler(req, res) {
  return res.json(_.find(users, { id: 1 }));
}
