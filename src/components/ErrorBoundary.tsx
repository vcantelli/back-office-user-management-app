"use client";

import { Component, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            padding: 4,
            textAlign: "center",
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <Typography variant="h5" mb={2}>
            Something went wrong.
          </Typography>
          <Typography variant="body2" mb={3}>
            Please try again or reload the page.
          </Typography>
          <Button onClick={this.handleReload} variant="contained">
            Reload
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}
