import { baseURL } from "@/shared/api/config";

export async function logout(): Promise<void> {
  try {
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

    const body = await response.text();
    if (body) {
      try {
        JSON.parse(body);
      } catch {
        // ignore non-json logout response
      }
    }
  } catch (error) {
    console.error("Не удалось выйти из системы", error);
  }
}
