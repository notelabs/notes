import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";
import initMiddleware from "../../../lib/init-middleware";
import Cors from 'cors'

const allowedOrigins = ['https://notelabs.me', 'https://app.notelabs.me']

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: function (origin, callback) {
      // @ts-ignore
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)
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