import { cookies } from "next/headers";

export async function setSession(token: string) {
  (await cookies()).set("auth_token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
export async function setUserName(token: string) {
  (await cookies()).set("user_name", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}
