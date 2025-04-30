"use server";

import { fetchWithAuth } from "./fetchWithAuth";

const apiKey = process.env.REQRES_API_KEY;
if (!apiKey) throw new Error("Missing REQRES_API_KEY environment variable");

const headers = {
  "Content-Type": "application/json",
  "x-api-key": apiKey,
};

export async function loginRequest(email: string, password: string) {
  try {
    const res = await fetchWithAuth("https://reqres.in/api/login", {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      switch (res.status) {
        case 400:
          throw new Error("Invalid credentials. Please try again.");
        case 401:
          throw new Error("Authentication error. Please check API key configuration.");
        default:
          throw new Error("An unexpected error occurred. Please try again later.");
      }
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to login: " + (error as Error).message);
  }
}

export async function registerRequest(email: string, password: string) {
  try {
    const res = await fetchWithAuth("https://reqres.in/api/register", {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      switch (res.status) {
        case 400:
          throw new Error("Invalid registration. Please check your information.");
        case 401:
          throw new Error("Authentication error. Please check API key configuration.");
        default:
          throw new Error("An unexpected error occurred. Please try again later.");
      }
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to register: " + (error as Error).message);
  }
}
