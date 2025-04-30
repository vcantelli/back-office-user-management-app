"use server";

import { setSession, setUserName } from "@/lib/auth";
import { registerSchema } from "@/schemas/registerSchema";

type RegisterState = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string[];
  };
};

export async function register(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    name: formData.get("name"),
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
    const response = await fetch("https://reqres.in/api/register", {
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
              general: ["Invalid registration. Please check your information."],
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

    await setSession(data.token);
    await setUserName(parsed.data.name);

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
