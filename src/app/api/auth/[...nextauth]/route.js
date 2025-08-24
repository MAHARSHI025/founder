// /app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/usermodel';
import { connect } from '@/dbconfig/dbconfig';
import bcryptjs from 'bcryptjs';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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
        if (!user.isverified) {
          throw new Error('You are not verified');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          organization_name: user.organization_name,
          profileimage: user.profileimage,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
   async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id || token.id;
        token.email = user.email || token.email;
        token.organization_name = user.organization_name || token.organization_name;
        token.profileimage = user.profileimage || token.picture || token.avatar_url || token.profileimage;
      }

      if (account?.provider === "google" || account?.provider === "github") {
        let dbUser = await User.findOne({ email: profile.email });

        if (!dbUser) {
          dbUser = await User.create({
            email: profile.email,
            organization_name: profile.name || "Social User",
            profileimage: profile.picture || profile.avatar_url || "",
            isverified: true,
            provider: account.provider
          });
        }

        token.id = dbUser._id.toString();
        token.organization_name = dbUser.organization_name;
        token.profileimage = dbUser.profileimage;
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
