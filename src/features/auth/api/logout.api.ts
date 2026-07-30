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
    throw new Error("Logout failed");
  }

  const body = await response.text();
  if (body) {
    try {
      JSON.parse(body);
    } catch {
      // ignore non-json logout response
    }
  }
}
