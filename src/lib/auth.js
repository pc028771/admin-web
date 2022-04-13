import _ from 'lodash';
import { getToken } from 'next-auth/jwt';

export const isAuthorizedAdmin = req => {
  let {
    method,
    nextUrl: { pathname },
  } = req;

  let privileges = _.get(req, 'nextauth.token.privileges.admin');
  if (_.isEmpty(privileges)) {
    return false;
  }

  let privilege = _.filter(privileges, (acl, key) => {
    let path = `/admin${key}`;
    return pathname.startsWith(path) && acl.includes(method);
  });

  return !_.isEmpty(privilege);
};

export const getACL = req => {
  let {
    method,
    nextUrl: { pathname },
  } = req;

  let privileges = _.get(req, 'nextauth.token.privileges.admin');
  if (_.isEmpty(privileges)) {
    return false;
  }

  let privilege = _.filter(privileges, (acl, key) => {
    let path = `/admin${key}`;
    return pathname.startsWith(path) && acl.includes(method);
  });

  return _.uniq(_.flatten(privilege));
};

export const isAuthorizedAdminAPI = req => {
  let {
    method,
    nextUrl: { pathname },
  } = req;

  let privileges = _.get(req, 'nextauth.token.privileges.admin');
  if (_.isEmpty(privileges)) {
    return false;
  }

  let privilege = _.filter(privileges, (acl, key) => {
    let path = `/api/admin${key}`;
    return pathname.startsWith(path) && acl.includes(method);
  });

  return !_.isEmpty(privilege);
};

export const isAdminRole = token => {
  if (!_.isArray(token?.roles)) {
    return false;
  }

  return token.roles.includes('admin');
};

export const getTokenData = async function ({ req }) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  });

  return { props: _.pick(token, ['name', 'roles', 'privileges']) };
};
