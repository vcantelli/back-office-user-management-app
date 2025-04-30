"use server";

import { setSession, setUserName } from "@/lib/auth";
import { registerRequest } from "@/lib/authApi";
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

  try {
    const data = await registerRequest(email, password);
    await setSession(data.token);
    await setUserName(parsed.data.name);

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
