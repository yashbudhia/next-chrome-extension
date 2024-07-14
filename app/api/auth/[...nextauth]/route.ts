import { prisma } from "@/prisma";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { signIn } from "next-auth/react";
import type { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    //error: "/auth/error", // Error code passed in query string as ?error=
    //verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/dashboard/home", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async session({ session, token }) {
      // Fetch the user from the database
      const user = await prisma.user.findUnique({
        where: { email: session.user?.email ?? undefined },
      });

      if (user) {
        session.user.id = user.id; // Attach the user ID to the session
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
