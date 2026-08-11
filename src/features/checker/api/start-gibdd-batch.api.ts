import { baseURL } from "@/shared/api/config";

export async function startGibddBatch(file: File): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${baseURL}/checks/gibdd/batch`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok && response.status !== 202) {
    const data: unknown = await response.json().catch(() => null);
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Не удалось запустить пакетную проверку";

    throw new Error(message);
  }
}
