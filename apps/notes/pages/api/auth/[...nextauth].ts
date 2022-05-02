import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import { NextApiRequest, NextApiResponse } from "next";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {

  // This helper function will allows us to get the domain name regardless of its form
  // beta.example.com => example.com
  // example.com/* => example.com
  // localhost:3000 => localhost
  const getDomainWithoutSubdomain = (url: string) => {
    const urlParts = new URL(url).hostname.split('.');

    return urlParts
      .slice(0)
      .slice(-(urlParts.length === 4 ? 3 : 2))
      .join('.');
  };

  // @ts-ignore
  const useSecureCookies = process.env.NEXTAUTH_URL.startsWith('https://');
  const cookiePrefix = useSecureCookies ? '__Secure-' : '';
  // @ts-ignore
  const hostName = getDomainWithoutSubdomain(process.env.NEXTAUTH_URL);

  // Define how we want the session token to be stored in our browser
  const cookies = {
    sessionToken:
    {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName == 'localhost' ? hostName : '.' + hostName // add a . in front so that subdomains are included
      },
    },
  };

  const callbacks = {
    // @ts-ignore
    async jwt({ token, user }) {
      // we store the user data and access token in the token
      if (user) {
        token.user = user.user;
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
      }

      return token;
    },
  };

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
    useSecureCookies,
    cookies,
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