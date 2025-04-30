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
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.first_name);
      setLastName(editingUser.last_name);
      setEmail(editingUser.email);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = () => {
    onSave({ first_name: firstName, last_name: lastName, email, avatar: "" }, editingUser?.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            autoFocus
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
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
