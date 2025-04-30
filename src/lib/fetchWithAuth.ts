"use server";

import { cookies } from "next/headers";

type Options = RequestInit & { withAuth?: boolean };

export async function fetchWithAuth(url: string, options: Options = {}) {
  const headers = new Headers(options.headers || {});
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (options.withAuth && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
