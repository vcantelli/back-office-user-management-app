"use server";

import { setSession } from "@/lib/auth";
import { loginRequest } from "@/lib/authApi";
import { loginSchema } from "@/schemas/loginSchema";

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

  try {
    const data = await loginRequest(email, password);
    await setSession(data.token);

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      errors: {
        general: [(error as Error).message],
      },
    };
  }
}
