import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
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
