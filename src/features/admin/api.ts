import { BalanceTransactionsResponseSchema, type BalanceTransactionsResponse } from "@/entities/balance";
import { UserSchema, type UserType } from "@/entities/user";
import { CheckSchema, type Check } from "@/entities/check";
import { baseURL } from "@/shared/api/config";

async function request(path: string, options?: RequestInit) {
  const response = await fetch(`${baseURL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!response.ok) throw new Error("Не удалось выполнить операцию");
  return response.status === 204 ? null : response.json();
}

export async function getAdminUsers(): Promise<UserType[]> {
  const data: unknown = await request("/user/");
  return UserSchema.array().parse(data);
}

export async function getAdminUserTransactions(userId: string): Promise<BalanceTransactionsResponse> {
  const data: unknown = await request(`/balance/admin/transactions/${userId}`);
  const normalized = Array.isArray(data)
    ? { items: data, total: data.length }
    : { items: (data as { items?: unknown[] })?.items ?? [], total: (data as { total?: number })?.total };
  const parsed = BalanceTransactionsResponseSchema.parse(normalized);
  return { items: parsed.items, total: parsed.total ?? parsed.items.length };
}

export async function getAdminUserChecks(userId: string): Promise<Check[]> {
  const data: unknown = await request(`/checks/admin/${userId}`);
  if (!Array.isArray(data)) throw new Error("Некорректный ответ сервера");

  return data.flatMap((item) => {
    const parsed = CheckSchema.safeParse(item);
    if (parsed.success) return [parsed.data];
    return [];
  });
}

export async function changeAdminBalance(
  operation: "credit" | "debit",
  userId: string,
  amount: number
) {
  await request(`/balance/admin/${operation}`, {
    method: "POST",
    body: JSON.stringify({ userId, amount }),
  });
}
