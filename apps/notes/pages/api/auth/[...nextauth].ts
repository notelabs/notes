import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: any, res: any) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    pages: {
      signIn: '/auth/login',
      error: '/auth/error',
      verifyRequest: '/auth/verify',
      newUser: '/auth/set-details'
    },
    secret: process.env.SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const isAllowedToSignIn = await prisma.waitlist.findFirst({
          where: {
            email: profile.email,
            invited: true
          }
        })
        if (isAllowedToSignIn) {
          return true
        } else {
          // Return false to display a default error message
          return '/unauthed'
        }
      }
    },
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM
      }),
      // ...add more providers here
    ],
  })
}