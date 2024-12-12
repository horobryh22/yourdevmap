import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { privateConfig } from "@/shared/config/private";
import { Provider } from "next-auth/providers/index";
import { createUserUseCase } from "@/entities/user/_use-cases/create-user";
import { AdapterUser } from "next-auth/adapters";

const {
  GITHUB_ID = "",
  GITHUB_SECRET = "",
  EMAIL_SERVER_PORT,
  EMAIL_SERVER_PASSWORD,
  EMAIL_SERVER_USER,
  EMAIL_SERVER_HOST,
  EMAIL_FROM,
} = privateConfig;

const prismaAdapter = PrismaAdapter(dbClient);

export const nextAuthConfig: AuthOptions = {
  adapter: {
    ...prismaAdapter,
    // ниже переопределяем функцию по созданию user своей (для создания роли)
    createUser: (user: AdapterUser) => createUserUseCase.exec(user),
  } as AuthOptions["adapter"],
  callbacks: {
    // ниже переопределяем, чтобы в сессию также прокидывалась и роль пользователя
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role,
        },
      };
    },
  },
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
