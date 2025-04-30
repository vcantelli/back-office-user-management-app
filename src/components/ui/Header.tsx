"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";

export default function Header() {
  const [userName, setUserName] = useState("User");
  const router = useRouter();

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find(row => row.startsWith("user_name="))
      ?.split("=")[1];

    if (cookieValue) {
      setUserName(decodeURIComponent(cookieValue));
    }
  }, []);

  const handleLogout = () => {
    deleteCookie("auth_token");
    deleteCookie("user_name");
    router.push("/login");
  };

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Hello, {userName}</Typography>
        <Box>
          <Button
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
