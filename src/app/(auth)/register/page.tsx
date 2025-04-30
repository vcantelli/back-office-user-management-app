"use client";

import { register } from "@/actions/register";
import { useActionState, useTransition } from "react";
import Link from "next/link";
import { Box, Card, CardContent, TextField, Typography, Alert } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/ui/SubmitButton";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(register, { success: false, errors: {} });
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
            Register
          </Typography>

          {state.errors?.general && <Alert severity="error">{state.errors.general[0]}</Alert>}

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
              label="Name"
              name="name"
              type="text"
              error={!!state.errors?.name}
              helperText={state.errors?.name ? state.errors.name[0] : ""}
              fullWidth
              required
              aria-describedby={state.errors?.name ? "name-error" : undefined}
            />

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

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              error={!!state.errors?.confirmPassword}
              helperText={state.errors?.confirmPassword ? state.errors.confirmPassword[0] : ""}
              fullWidth
              required
              aria-describedby={state.errors?.confirmPassword ? "confirmPassword-error" : undefined}
            />

            <SubmitButton label="Create Account" loadingLabel="Creating..." />

            <Typography variant="body2" textAlign="center">
              Already have an account?{" "}
              <Link href="/login" style={{ color: "inherit", textDecoration: "underline" }}>
                Sign In
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
