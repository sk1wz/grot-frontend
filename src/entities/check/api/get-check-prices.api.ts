import { baseURL } from "@/shared/api/config";
import { CheckModule } from "../model";

export type CheckPrice = {
  module: CheckModule;
  price: number;
  title: string;
  description: string;
  updatedAt: string;
};

export async function getCheckPrices(): Promise<CheckPrice[]> {
  const response = await fetch(`${baseURL}/checks/prices`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Не удалось загрузить цены проверок");

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("Некорректный ответ сервера");

  return data.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const price = item as Partial<CheckPrice>;
    if (
      !Object.values(CheckModule).includes(price.module as CheckModule) ||
      typeof price.price !== "number" ||
      typeof price.title !== "string" ||
      typeof price.description !== "string" ||
      typeof price.updatedAt !== "string"
    ) {
      return [];
    }
    return [price as CheckPrice];
  });
}
