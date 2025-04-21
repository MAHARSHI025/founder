import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";

const handler = NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider (Plain Password Comparison)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (user.password !== credentials.password) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id,
          name: user.username,
          email: user.email,
          image: user.profileimage,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ profile, account }) {
      if (account?.provider === "google") {
        if (!profile?.email_verified) return false;

        try {
          await connect();

          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            await User.create({
              username: profile.name,
              email: profile.email,
              password: "nopassword", // placeholder since Google doesn't give password
              profileimage: profile.picture,
            });

            console.log("New user created from Google sign-in");
          } else {
            console.log("User already exists, skipping creation.");
          }

          return true;
        } catch (err) {
          console.error("Error in Google signIn callback:", err);
          return false;
        }
      }

      return true; // for credentials login
    },

    async jwt({ token, account, user }) {
      await connect();

      const userInDb = await User.findOne({ email: token.email });

      if (userInDb) {
        token.name = userInDb.username;
        token.picture = userInDb.profileimage;
        token.isNewUser = userInDb.password === "nopassword";
      }

      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.isNewUser = token.isNewUser ?? false;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
