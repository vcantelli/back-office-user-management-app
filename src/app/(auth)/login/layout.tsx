import { ReactNode } from "react";

export const metadata = {
  title: "Login - User Management",
  description: "Access your account in the back-office platform.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
