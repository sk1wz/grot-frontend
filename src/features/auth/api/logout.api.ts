import { useUserStore } from "@/entities/user";
import { baseURL } from "@/shared/api/config";

export async function logout(): Promise<void> {
  const setUser = useUserStore((state) => state.setUser);
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
      setUser(null);
      
    } catch {
      // ignore non-json logout response
    }
  }
}
