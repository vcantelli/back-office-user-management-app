"use server";

import { User } from "@/types/user";

export async function fetchUsers(page = 1) {
  const apiKey = process.env.REQRES_API_KEY;
  if (!apiKey) {
    throw new Error("Missing REQRES_API_KEY environment variable");
  }

  const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    cache: "no-store",
  });

  const data = await res.json();
  return {
    data: data.data,
    total_pages: data.total_pages,
  };
}

export async function createUser(user: Omit<User, "id">) {
  const res = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return res.json();
}

export async function updateUser(id: string, user: Omit<User, "id">) {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return res.json();
}

export async function deleteUser(id: string) {
  return await fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
  });
}
