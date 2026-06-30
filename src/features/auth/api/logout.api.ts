import { useUserStore } from "@/entities/user";
import { baseURL } from "@/shared/api/config";

export async function logout(): Promise<void> {
  const response = await fetch(`${baseURL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Не удалось выйти из системы");
  }
  if (response.ok) {
    useUserStore.getState().setUser(null);
  }

  // Backend may return empty body (204), so avoid unconditional response.json().
  const body = await response.text();
  if (!body) {
    return;
  }

  try {
    JSON.parse(body);
  } catch {
    return;
  }
}
