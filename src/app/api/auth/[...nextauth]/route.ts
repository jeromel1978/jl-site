import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
  // handler as HEAD,
  // handler as PUT,
  // handler as DELETE,
  // handler as CONNECT,
  // handler as OPTION,
  // handler as TRACE,
  // handler as PATCH,
};
