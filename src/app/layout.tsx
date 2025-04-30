"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "@/styles/theme";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/ui/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const pathname = usePathname();

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

  const toggleTheme = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("theme", next);
  };

  const shouldShowHeader = pathname !== "/login" && pathname !== "/register";

  return (
    <html lang="en">
      <body data-theme={mode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <main id="main" tabIndex={-1}>
            <ErrorBoundary>
              {shouldShowHeader && <Header toggleTheme={toggleTheme} />}
              {children}
            </ErrorBoundary>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
