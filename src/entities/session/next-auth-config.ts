import GithubProvider from "next-auth/providers/github";
import type { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { privateConfig } from "@/shared/config/private";
import { Provider } from "next-auth/providers/index";

const { GITHUB_ID, GITHUB_SECRET } = privateConfig;

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  providers: [
    GITHUB_ID &&
      GITHUB_SECRET &&
      GithubProvider({
        clientId: GITHUB_ID,
        clientSecret: GITHUB_SECRET,
      }),
  ].filter(Boolean) as Provider[],
};
