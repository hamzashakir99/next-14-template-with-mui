import { AuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

import { CustomError } from '@/lib/index';


export const authOptions: AuthOptions = {
  /*pages: {
      signIn: '/admin/auth/login'
      // signOut: '/auth/sign-out',
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },*/
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: 'admin-login',
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: 'Phone', type: 'phone' },
        password: { label: 'Password', type: 'password' },
        domain: { label: 'Domain', type: 'text' }
      },
      async authorize(credentials) {
        try {
          // Add logic here to look up the user from the credentials supplied
          console.log(credentials)
          cookies().set('token', "your-token", {
            secure: true,
            maxAge: 24 * 60 * 60
          });
          return {
            name: 'Admin',
            id: 'admin',
          };
          //    throw new CustomError(res.data.message, res.status, res.data.data); error throw on case
        } catch (error) {
          console.error(error);
          if (error instanceof CustomError) {
            throw new Error(JSON.stringify(error));
          } else {
            throw new Error(
              JSON.stringify({
                errors: 'Failed to authenticate. Please try again.',
                status: 500
              })
            );
          }
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 24 * 60 * 60
  },
  jwt: {
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }: any) {
      return {
        ...token,
        ...user
      };
    },

    async session({ session, token }: any) {
      session.user = token;
      return session;
    }
  }
};
