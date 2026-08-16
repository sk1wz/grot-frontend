import { baseURL } from "@/shared/api/config";
import { CheckSchema, type Check } from "../model";

export async function getCheckById(
  checkId: string,
  isAdmin = false
): Promise<Check> {
  const path = isAdmin
    ? `/checks/admin/check/${checkId}`
    : `/checks/${checkId}`;
  const response = await fetch(`${baseURL}${path}`, {
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
