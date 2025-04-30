import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard - User Management",
  description: "Access the dashboard of the back-office platform.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
