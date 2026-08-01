import { cookies } from "next/headers";
import { baseURL } from "@/shared/api/config";
import { UserSchema, type UserType } from "../model";

export async function getCurrentUser(): Promise<UserType | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session || !baseURL) {
    return null;
  }

  const response = await fetch(`${baseURL}/user/me`, {
    method: "GET",
    headers: {
      Cookie: `session=${session}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();
  const parsedUser = UserSchema.safeParse(data);

  return parsedUser.success ? parsedUser.data : null;
}
