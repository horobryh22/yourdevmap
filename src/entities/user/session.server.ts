"use server";

import { nextAuthConfig } from "@/entities/user/next-auth-config";
import { getServerSession } from "next-auth";
import { NeedAuthError } from "@/shared/lib/errors";
import { SessionEntity } from "@/entities/user/_domain/types";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);

export const getAppSessionStrictServer = async (): Promise<SessionEntity> => {
  const session = await getAppSessionServer();

  if (!session) {
    throw new NeedAuthError();
  }

  return session;
};
