"use client";

import { AppBar, Toolbar, Typography, Button, Box, IconButton, useTheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteCookie } from "cookies-next";

type Props = {
  toggleTheme: () => void;
};

export default function Header({ toggleTheme }: Props) {
  const [userName, setUserName] = useState("User");
  const router = useRouter();
  const theme = useTheme();

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
          <IconButton onClick={toggleTheme} color="inherit" aria-label="Toggle theme">
            {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
