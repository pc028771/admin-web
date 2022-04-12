import _ from 'lodash';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { isAuthorizedAdminAPI, isAdminRole } from '../../../lib/auth';

export default withAuth(
  function middleware(req) {
    if (isAuthorizedAdminAPI(req)) {
      return NextResponse.next();
    }

    return new Response('Unauthorized', { status: 403 });
  },
  {
    callbacks: {
      authorized: async ({ token, req }) => isAdminRole(token),
    },
  },
);
