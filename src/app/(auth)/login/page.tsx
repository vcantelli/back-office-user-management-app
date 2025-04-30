"use client";

import { login } from "@/actions/login";
import { useActionState, useTransition } from "react";
import Link from "next/link";
import { Box, Card, CardContent, TextField, Typography, Alert } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(login, { success: false, errors: {} });
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "grey.100",
        padding: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, padding: 2, borderRadius: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography variant="h5" component="h1" textAlign="center" fontWeight="bold">
            Sign In
          </Typography>

          {state.errors?.general && (
            <Alert severity="error" role="alert">
              {state.errors.general[0]}
            </Alert>
          )}

          <form
            action={formAction}
            onSubmit={e => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              startTransition(() => {
                formAction(formData);
              });
            }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              error={!!state.errors?.email}
              helperText={state.errors?.email ? state.errors.email[0] : ""}
              fullWidth
              required
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              error={!!state.errors?.password}
              helperText={state.errors?.password ? state.errors.password[0] : ""}
              fullWidth
              required
              aria-describedby={state.errors?.password ? "password-error" : undefined}
            />

            <SubmitButton label="Sign In" loadingLabel="Signing In..." />

            <Typography variant="body2" textAlign="center">
              Don&apos;t have an account?{" "}
              <Link href="/register" style={{ color: "inherit", textDecoration: "underline" }}>
                Register
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
