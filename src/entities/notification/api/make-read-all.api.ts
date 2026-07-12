import { baseURL } from "@/shared/api/config";

export async function makeReadAllNotifications(): Promise<boolean> {
  try {
    const response = await fetch(`${baseURL}/notifications/make-read-all`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}
