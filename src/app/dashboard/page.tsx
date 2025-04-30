import { cookies } from "next/headers";
import { use } from "react";
import { Typography, Box } from "@mui/material";

export default function DashboardPage() {
  const cookieStore = use(cookies());
  const name = cookieStore.get("user_name")?.value ?? "User";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey.100",
      }}
    >
      <Typography variant="h4" component="h1">
        Hello {name}
      </Typography>
    </Box>
  );
}
