import _ from 'lodash';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ token: { privileges }, req }) => {
      let { page } = privileges;
      let {
        method,
        nextUrl: { pathname },
      } = req;

      //Check page privilege
      let privilege = _.filter(page, (acl, key) => pathname.startsWith(key) && acl.includes(method));
      if (!_.isEmpty(privilege)) {
        return true;
      }

      return false;
    },
  },
});
