import { baseURL } from "@/shared/api/config";
import { CheckSchema, type Check } from "../model";

export async function getCheckById(checkId: string): Promise<Check> {
  const response = await fetch(`${baseURL}/checks/${checkId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Не удалось загрузить проверку");
  }

  const parsed = CheckSchema.safeParse(await response.json());

  if (!parsed.success) {
    throw new Error("Некорректный ответ сервера");
  }

  return parsed.data;
}
