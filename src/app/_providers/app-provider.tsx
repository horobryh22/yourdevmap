"use client";

import { ThemeProvider } from "./theme-provider";
import { ReactNode } from "react";
import { ComposeChildren } from "@/shared/lib/react";
import { AppSessionProvider } from "@/entities/user/session";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      <AppSessionProvider />
      <QueryClientProvider client={queryClient} />
      {children}
    </ComposeChildren>
  );
}
