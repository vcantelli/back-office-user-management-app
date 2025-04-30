"use client";

import { Button, CircularProgress } from "@mui/material";
import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  loadingLabel: string;
};

export function SubmitButton({ label, loadingLabel }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      disabled={pending}
      startIcon={pending ? <CircularProgress size={20} color="inherit" /> : null}
    >
      {pending ? loadingLabel : label}
    </Button>
  );
}
