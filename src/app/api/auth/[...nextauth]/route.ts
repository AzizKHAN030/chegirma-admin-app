// import { authenticate } from "@/services/authService"
import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from '@/core/axios';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Number', type: 'number' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('>>>', credentials);

        if (typeof credentials !== 'undefined') {
          //   const res = await authenticate(credentials.email, credentials.password)
          const res = {
            user: {
              id: 1,
              email: 'asd@asd.asd',
              fullname: 'John Doe',
              role: 'SUPER',
              number: '+998903590066',
              createdAt: '2021-05-30T06:45:19.000Z',
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.y3kjst36zujMF4HssVk3Uqxf_3bzumNAvOB9N0_uRV4',
          };
          if (typeof res !== 'undefined') {
            return { ...res.user, apiToken: res.token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: 'phonenumber',
      name: 'Phone Number',
      async authorize(credentials, req) {
        const { phonenumber, code } = credentials;
        try {
          const res = await axios.post('/auth/verify', {
            verificationCode: code,
          });
          console.log('>>> 21', res);
        } catch (error) {
          console.log('>>> 21', error);
        }

        const user = {
          /* add function to get user */
        };
        return user;
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      const user = {
        id: 1,
        email: 'asd@asd.asd',
        fullname: 'John Doe',
        role: 'SUPER',
        number: '+998903590066',
        createdAt: '2021-05-30T06:45:19.000Z',
      };

      return { ...session, user: user };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
