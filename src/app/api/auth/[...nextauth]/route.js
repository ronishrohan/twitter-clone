import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  createUser,
  getUserDetails,
} from "@/app/mongodb/controllers/user.controller";
import { connectDatabase } from "@/app/utils/connectDatabase";

export const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      await createUser(profile);
      return true;
    },
    async session({ session }) {
      
      const { id, username, savedPosts, following,  followers } = await getUserDetails(
        session.user.email
      );
      if(username == "freeiptvlinks268"){
        return null;
      }
      if (id && username) {
        session.user._id = id;
        session.user.username = username;
        session.user.savedPosts = savedPosts;
        session.user.following = following;
        session.user.followers = followers;
        return session;
      } else {
        return session;
      }
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
