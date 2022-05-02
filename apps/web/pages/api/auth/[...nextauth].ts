import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Same thing as earlier, grabbing the domain name regardless of subdomain
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
        if (user) {
            token.accessToken = user.access_token;
            token.user = user.user;
            token.refreshToken = user.refresh_token;
        }

        return token;
    },

    // @ts-ignore
    async session({ session, token }) {
        session.accessToken = token.accessToken;
        const { firstName, lastName, email, image } = token.user;
        session.user = {
            name: `${firstName} ${lastName}`,
            email: email,
            image: image
        }
        session.refreshToken = token.refreshToken;
        return session;
    },
};

const options = {
    debug: false,
    secret: // your secret,
    useSecureCookies,
    cookies,
    providers: [
        // @ts-ignore
        CredentialsProvider({
            name: 'credentials',
            id: 'credentials',
            // We don't do anything because the user should have already been authenticated
            // if thats not the case, you should redirect the user to app #1
            async authorize(credentials, req) { return null; } 
        }),
    ],
    callbacks,
};

// @ts-ignore
const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;