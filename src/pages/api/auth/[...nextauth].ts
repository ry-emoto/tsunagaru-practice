import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credential',
      async authorize() {
        const user = { id: '', name: 'Guest User', email: 'guest@example.com' };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      credentials: {},
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async session({ session }: any) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      session.user.id = user?.id;
      return session;
    },
  },
  events: {
    signIn: async ({ user }: any) => {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    },
  },
  // adapter: PrismaAdapter(prisma),
};
