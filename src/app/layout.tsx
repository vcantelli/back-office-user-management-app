"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/theme";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setMode(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialMode = prefersDark ? "dark" : "light";
      setMode(initialMode);
      localStorage.setItem("theme", initialMode);
    }
  }, []);

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <main id="main" tabIndex={-1}>
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
