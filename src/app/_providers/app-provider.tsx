"use client";

import { ThemeProvider } from "./theme-provider";
import { ReactNode } from "react";
import { ComposeChildren } from "@/shared/lib/react";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      {children}
    </ComposeChildren>
  );
}
