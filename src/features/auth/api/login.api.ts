import { UserType } from "@/entities/user";
import { baseURL } from "@/shared/api/config";

export type LoginResponse = {
  user: UserType;
  message?: string;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = (await response.json()) as LoginResponse | { message?: string };

  if (!response.ok) {
    throw new Error(data.message || "Не удалось войти в систему");
  }

  return data as LoginResponse;
};
