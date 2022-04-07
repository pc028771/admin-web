import { getRoles } from '../../../../repositories/roles';

export default async function handler(req, res) {
  let {
      query: { id },
    } = req,
    [roles] = await Promise.all([getRoles()]);

  let relations = { roles };

  return res.json(relations);
}
