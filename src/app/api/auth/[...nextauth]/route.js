// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/usermodel';
import { connect } from '@/dbconfig/dbconfig';
import bcryptjs from 'bcryptjs';

connect();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error('No user found');
        const valid = await bcryptjs.compare(credentials.password, user.password);
        if (!valid) throw new Error('Invalid password');

        return {
          id: user._id.toString(), 
          email: user.email,
          organization_name: user.organization_name,
          profileimage: user.profileimage,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
        token.email = user.email; 
        token.organization_name = user.organization_name;
        token.profileimage = user.profileimage; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; 
        session.user.email = token.email;
        session.user.organization_name = token.organization_name;
        session.user.profileimage = token.profileimage;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
});

export { handler as GET, handler as POST };
