import { baseURL } from "@/shared/api/config";

export async function startCheck(
  endpoint: string,
  body: Record<string, unknown>
): Promise<void> {
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

export async function startBatchCheck(
  endpoint: string,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data: unknown = await response.json().catch(() => null);

  if (response.status !== 202 && !response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Не удалось загрузить файл для проверки";
    throw new Error(message);
  }
}
