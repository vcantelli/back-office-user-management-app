"use client";

import { useUserManager } from "@/hooks/useUserManager";
import UserTable from "./components/UserTable";
import UserFormDialog from "./components/UserFormDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import { Box, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { User } from "@/types/user";

export default function DashboardPage() {
  const {
    users,
    page,
    totalPages,
    loading,
    setPage,
    handleSave,
    handleDelete,
    deletingUserId,
    setDeletingUserId,
  } = useUserManager();

  const [openForm, setOpenForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setOpenForm(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          aria-label="Add user"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add User
        </Button>
      </Box>

      {!loading && (
        <UserTable
          users={users}
          page={page}
          totalPages={totalPages}
          onEdit={user => {
            setEditingUser(user);
            setOpenForm(true);
          }}
          onDelete={id => setDeletingUserId(id)}
          onPageChange={setPage}
        />
      )}

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      <UserFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        editingUser={editingUser}
      />

      <ConfirmDialog
        open={!!deletingUserId}
        onClose={() => setDeletingUserId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
