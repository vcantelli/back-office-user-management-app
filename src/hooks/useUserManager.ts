"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/lib/usersApi";
import { User } from "@/types/user";

export function useUserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const { data, total_pages } = await fetchUsers(page);
      setUsers(data);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAdd = () => {
    setEditingUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpenForm(true);
  };

  const handleSave = async (user: Omit<User, "id">, id?: string) => {
    try {
      if (id) {
        const updated = await updateUser(id, user);
        console.log("Updated:", updated);
      } else {
        const created = await createUser(user);
        console.log("Created:", created);
      }
      await loadUsers();
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const handleDelete = async () => {
    if (!deletingUserId) return;
    try {
      const res = await deleteUser(deletingUserId);
      console.log("Deleted:", res);
      setDeletingUserId(null);
      await loadUsers();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return {
    users,
    page,
    totalPages,
    openForm,
    editingUser,
    deletingUserId,
    setOpenForm,
    setDeletingUserId,
    setPage,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
  };
}
