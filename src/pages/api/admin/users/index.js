import { getUsers, createUser } from '../../../../repositories/user';

export default async function handler(req, res) {
  let users = [];
  switch (req.method) {
    case 'POST':
      await createUser(req.body);
      break;
    case 'GET':
      users = await getUsers();
  }

  return res.json(users);
}
