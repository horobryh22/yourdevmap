"use server";

import { nextAuthConfig } from "@/entities/user/next-auth-config";
import { getServerSession } from "next-auth";

export const getAppSessionServer = () => getServerSession(nextAuthConfig);
