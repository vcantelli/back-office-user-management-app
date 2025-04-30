"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/lib/usersApi";
import { User } from "@/types/user";

export function useUserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const loadPage = (targetPage: number) => {
    setPage(targetPage);
    startTransition(async () => {
      try {
        const { data, total_pages } = await fetchUsers(targetPage);
        setUsers(data);
        setTotalPages(total_pages);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users. Please try again.");
        setUsers([]);
        setTotalPages(1);
      }
    });
  };

  const handleSave = async (user: Omit<User, "id">, id?: string) => {
    try {
      if (id) {
        await updateUser(id, user);
      } else {
        await createUser(user);
      }
    } catch (err) {
      console.error("Failed to save user:", err);
    } finally {
      loadPage(1);
    }
  };

  const handleDelete = async () => {
    if (!deletingUserId) return;

    try {
      await deleteUser(deletingUserId);
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setDeletingUserId(null);
      loadPage(1);
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  return {
    users,
    page,
    totalPages,
    isPending,
    error,
    setPage: loadPage,
    handleSave,
    handleDelete,
    deletingUserId,
    setDeletingUserId,
  };
}
