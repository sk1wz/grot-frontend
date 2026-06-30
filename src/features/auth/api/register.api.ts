import { UserType } from "@/entities/user";
import { baseURL } from "@/shared/api/config";

export type RegisterResponse = {
  user: UserType;
  message?: string;
};

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = (await response.json()) as
    | RegisterResponse
    | { message?: string };

  if (!response.ok) {
    throw new Error(data.message || "Не удалось войти в систему");
  }

  return data as RegisterResponse;
};
