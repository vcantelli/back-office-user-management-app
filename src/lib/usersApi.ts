"use server";

import { User } from "@/types/user";

function getHeaders(): HeadersInit {
  const apiKey = process.env.REQRES_API_KEY;
  if (!apiKey) {
    throw new Error("Missing REQRES_API_KEY environment variable");
  }

  return {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };
}

export async function fetchUsers(page = 1) {
  const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return {
    data: data.data,
    total_pages: data.total_pages,
  };
}

export async function createUser(user: Omit<User, "id">) {
  const res = await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create user: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function updateUser(id: string, user: Omit<User, "id">) {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update user ${id}: ${res.status} ${errorText}`);
  }

  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`https://reqres.in/api/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete user ${id}: ${res.status} ${errorText}`);
  }

  return true;
}
