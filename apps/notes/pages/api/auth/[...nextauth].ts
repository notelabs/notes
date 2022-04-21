import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"

export default NextAuth({
  pages: {
    signIn: '/app/auth/login',
    error: '/app/auth/error',
    verifyRequest: '/app/auth/verify'
  },
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_ID,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    // ...add more providers here
  ],
})