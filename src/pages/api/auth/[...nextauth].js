import _ from 'lodash';
import NextAuth from 'next-auth';
import { createHmac } from 'crypto';
import SequelizeAdapter from '@next-auth/sequelize-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sequelize, User, Role } from '../../../models';
import { getUserPrivileges } from '../../../repositories/users';
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: '帳號', type: 'text', placeholder: '使用者帳號' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize({ username, password, csrfToken }, req) {
        let hmac = createHmac('sha256', NEXTAUTH_SECRET);
        let hash = hmac.update(password).digest('hex');

        return await User.findOne({
          where: { username, hash },
          include: Role,
        });
      },
    }),
  ],
  adapter: SequelizeAdapter(sequelize),
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      let privileges = await getUserPrivileges({ userId: user.id });
      let roles = user.roles.map(({ key }) => key);

      _.merge(token, { roles, privileges }, _.pick(user, ['id', 'name', 'email']));
      return token;
    },
  },
});
