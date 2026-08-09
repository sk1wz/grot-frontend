import { baseURL } from "@/shared/api/config";

export async function startCheck(
  endpoint: string,
  body: Record<string, unknown>
): Promise<void> {
  console.log(body);
  console.log(endpoint);
  const response = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (response.status !== 202 && !response.ok) {
    throw new Error(
      "message" in data && data.message
        ? data.message
        : "Не удалось запустить проверку"
    );
  }

  return data;
}
