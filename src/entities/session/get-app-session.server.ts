"use server";

import { nextAuthConfig } from "@/entities/session/next-auth-config";
import { getServerSession } from "next-auth";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);
