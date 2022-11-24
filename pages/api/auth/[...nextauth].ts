import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import usersConnect from '../../../database/usersConnect';
import Users from '../../../models/Users';
import { compare } from 'bcrypt';
import { signIn } from 'next-auth/react';

export default NextAuth({
  providers: [
    // @ts-ignore
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials: any, req: any) {
        usersConnect().catch((error: any) => {
          error: 'Connection Failed...!';
        });

        // check user existence
        const result = await Users.findOne({ email: credentials?.email });

        if (!result) {
          throw new Error('No user found with the email please sign up...!');
        }

        // compare
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials?.email) {
          throw new Error(`Email or Password doesn't match`);
        }

        return result;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
    async session({ session, user }: any) {
      session.id = user.id;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
