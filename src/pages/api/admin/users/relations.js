import { getRoles } from '../../../../repositories/roles';

export default async function handler(req, res) {
  let [roles] = await Promise.all([getRoles()]);

  let relations = { roles };

  return res.json(relations);
}
