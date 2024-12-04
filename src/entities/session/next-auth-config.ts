import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import type { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { privateConfig } from "@/shared/config/private";
import { Provider } from "next-auth/providers/index";

const {
  GITHUB_ID = "",
  GITHUB_SECRET = "",
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_PASSWORD,
  EMAIL_SERVER_USER,
  EMAIL_SERVER_HOST,
  EMAIL_FROM,
} = privateConfig;

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient) as AuthOptions["adapter"],
  // заменяем страницы предоставляемые next-auth своими
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    [GITHUB_ID, GITHUB_SECRET].every(Boolean) &&
      GithubProvider({
        clientId: GITHUB_ID,
        clientSecret: GITHUB_SECRET,
      }),
    [
      EMAIL_SERVER_PORT,
      EMAIL_SERVER_PASSWORD,
      EMAIL_SERVER_USER,
      EMAIL_SERVER_HOST,
      EMAIL_FROM,
    ].every(Boolean) &&
      EmailProvider({
        server: {
          host: EMAIL_SERVER_HOST,
          port: Number(EMAIL_SERVER_PORT),
          auth: {
            user: EMAIL_SERVER_USER,
            pass: EMAIL_SERVER_PASSWORD,
          },
        },
        from: EMAIL_FROM,
      }),
  ].filter(Boolean) as Provider[],
};
