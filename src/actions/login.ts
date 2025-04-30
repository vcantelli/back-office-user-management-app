"use server";

import { loginSchema } from "@/schemas/loginSchema";
import { cookies } from "next/headers";

type LoginState = {
  success: boolean;
  errors: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
};

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  const apiKey = process.env.REQRES_API_KEY;
  if (!apiKey) {
    throw new Error("Missing REQRES_API_KEY environment variable");
  }

  try {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return {
            success: false,
            errors: {
              general: ["Invalid credentials. Please try again."],
            },
          };
        case 401:
          return {
            success: false,
            errors: {
              general: ["Authentication error. Please check API key configuration."],
            },
          };
        default:
          return {
            success: false,
            errors: {
              general: ["An unexpected error occurred. Please try again later."],
            },
          };
      }
    }

    const data = await response.json();

    (await cookies()).set("auth_token", data.token, {
      path: "/",
    });

    return {
      success: true,
      errors: {},
    };
  } catch {
    return {
      success: false,
      errors: {
        general: ["Something went wrong. Please try again."],
      },
    };
  }
}
