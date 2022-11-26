import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import usersConnect from '../../../database/usersConnect';
import Users from '../../../models/Users';
import { compare } from 'bcrypt';

export const authOptions: any = {
  providers: [
    // @ts-ignore
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials: any, req) {
        usersConnect().catch((error) => {
          error: 'Connection Failed...!';
        });

        // check user existance
        const result = await Users.findOne({ email: credentials?.email });
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }

        // compare()
        const checkPassword = await compare(
          credentials?.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials?.email) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
