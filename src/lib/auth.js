import _ from 'lodash';

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
