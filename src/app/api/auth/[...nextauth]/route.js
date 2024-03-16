import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  createUser,
  getUserDetails,
} from "@/app/mongodb/controllers/user.controller";

export const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      await createUser(profile);
      return true;
    },
    async session({ session }) {
      const { id, username } = await getUserDetails(session.user.email);
      session.user._id = id;
      session.user.username = username;

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
