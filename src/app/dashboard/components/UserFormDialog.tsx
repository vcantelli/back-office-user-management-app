"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, "id">, id?: string) => void;
  editingUser: User | null;
};

export default function UserFormDialog({ open, onClose, onSave, editingUser }: Props) {
  const [firstName, setFirstName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.first_name);
      setJob(editingUser.job);
    } else {
      setFirstName("");
      setJob("");
    }
  }, [editingUser]);

  const handleSubmit = () => {
    onSave(
      { first_name: firstName, job: job, email: "", avatar: "", last_name: "" },
      editingUser?.id,
    );
    onClose();
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
            label="First Name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            autoFocus
          />
          <TextField label="Job" fullWidth value={job} onChange={e => setJob(e.target.value)} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {editingUser ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
