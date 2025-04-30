"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { User } from "@/types/user";
import { userFormSchema } from "@/schemas/userFormSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id">, id?: string) => void;
  editingUser: User | null;
};

export default function UserFormDialog({ open, onClose, onSave, editingUser }: Props) {
  const [firstName, setFirstName] = useState("");
  const [job, setJob] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.first_name);
      setJob(editingUser.job);
    } else {
      clearForm();
    }
    setErrors({});
  }, [editingUser]);

  const clearForm = () => {
    setFirstName("");
    setJob("");
  };

  const handleSubmit = () => {
    const parsed = userFormSchema.safeParse({ first_name: firstName, job: job });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        first_name: fieldErrors.first_name?.[0] || "",
        job: fieldErrors.job?.[0] || "",
      });
      return;
    }

    startTransition(() => {
      onSave(
        { first_name: firstName, job: job, email: "", avatar: "", last_name: "" },
        editingUser?.id,
      );
      clearForm();
      onClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="user-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="user-dialog-title">{editingUser ? "Edit User" : "Create User"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="first_name"
            label="First Name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            error={!!errors.first_name}
            helperText={errors.first_name}
            aria-invalid={!!errors.first_name}
            aria-describedby="first-name-error"
            autoFocus
          />
          <TextField
            name="job"
            label="Job"
            fullWidth
            value={job}
            onChange={e => setJob(e.target.value)}
            error={!!errors.job}
            helperText={errors.job}
            aria-invalid={!!errors.job}
            aria-describedby="first-name-error"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isPending}>
          {isPending ? <CircularProgress size={20} /> : editingUser ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
