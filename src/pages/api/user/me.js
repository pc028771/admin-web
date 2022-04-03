// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const _ = require('lodash');
const { User } = require('../../../models');

export default async (req, res) => {
  let user = await User.findByPk(1);
  if (_.isEmpty(user)) {
    return res.status(404).end();
  }

  return res.json(user.get({ raw: true }));
};
