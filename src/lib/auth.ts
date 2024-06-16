import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { tenant, PasskeyProvider } from "@teamhanko/passkeys-next-auth-provider";

import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { encode, decode } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: { encode, decode },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (credentials?.username === "jerome" && credentials?.password === "!JLS1t3transformers")
          return { id: "jerome", name: "Jerome" };
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
    // PasskeyProvider({
    //   tenant: tenant({
    //     tenantId: process.env.PASSKEYS_API_KEY!,
    //     apiKey: process.env.NEXT_PUBLIC_PASSKEYS_TENANT_ID!,
    //   }),
    //   async authorize({ userId }) {
    //     console.log(userId);
    //     return {
    //       id: "jerome",
    //       Name: "Jerome Losorata",
    //       FirstName: "Jerome",
    //       LastName: "Losorata",
    //       EMail: "jerome@veritablewealth.com",
    //     };
    //     // const user = db.users.find(userId);
    //     // Do more stuff
    //     // return {
    //     // 	id: user.id,
    //     // 	name: user.username,
    //     // };
    //   },
    // }),
  ],
  // callbacks: {
  //   session: ({ session, token }) => {
  //     if (token) {
  //       return {
  //         ...session,
  //         user: {
  //           ...session.user,
  //           id: token.sub,
  //         },
  //       };
  //     } else {
  //       return session;
  //     }
  //   },
  // },
} satisfies NextAuthOptions;

// Use it in server contexts
export const auth = (
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) => {
  return getServerSession(...args, authOptions);
};

// export const session = ({ session, token }) => {
//   session.accessToken = token.accessToken
//   return session};
