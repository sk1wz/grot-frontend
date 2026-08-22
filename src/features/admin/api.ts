import {
  BalanceTransactionsResponseSchema,
  type BalanceTransactionsResponse,
} from "@/entities/balance";
import { UserSchema, type UserType } from "@/entities/user";
import {
  BatchCheckSchema,
  CheckModule,
  CheckSchema,
  type BatchCheck,
  type Check,
} from "@/entities/check";
import { baseURL } from "@/shared/api/config";

export const FeedbackStatus = {
  NEW: "NEW",
  IN_REVIEW: "IN_REVIEW",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  ARCHIVED: "ARCHIVED",
} as const;
export type FeedbackStatus = (typeof FeedbackStatus)[keyof typeof FeedbackStatus];
export type FeedbackRequest = {
  id: string; name: string; companyName: string; email: string; phone: string;
  message: string; status: FeedbackStatus;
  attachment: { name: string; mimeType: string | null; size: number | null } | null;
  createdAt: string; updatedAt: string;
};

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

export async function getAdminUserTransactions(
  userId: string
): Promise<BalanceTransactionsResponse> {
  const data: unknown = await request(`/balance/admin/transactions/${userId}`);
  const normalized = Array.isArray(data)
    ? { items: data, total: data.length }
    : {
        items: (data as { items?: unknown[] })?.items ?? [],
        total: (data as { total?: number })?.total,
      };
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

export async function getAdminUserBatchChecks(
  userId: string,
): Promise<BatchCheck[]> {
  const data: unknown = await request(`/checks/admin/${userId}/batch`);
  if (!Array.isArray(data)) throw new Error("Некорректный ответ сервера");

  return data.flatMap((item) => {
    const parsed = BatchCheckSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
}

export type ChecksStatistics = {
  totalChecks: number;
  byModule: Record<CheckModule, number>;
};

export async function getChecksStatistics(): Promise<ChecksStatistics> {
  const data: unknown = await request("/checks/statistics");
  if (!data || typeof data !== "object") {
    throw new Error("Некорректный ответ сервера");
  }

  const response = data as {
    totalChecks?: unknown;
    byModule?: Record<string, unknown>;
  };
  if (typeof response.totalChecks !== "number" || !response.byModule) {
    throw new Error("Некорректный ответ сервера");
  }

  return {
    totalChecks: response.totalChecks,
    byModule: Object.fromEntries(
      Object.values(CheckModule).map((module) => [
        module,
        typeof response.byModule?.[module] === "number"
          ? response.byModule[module]
          : 0,
      ]),
    ) as Record<CheckModule, number>,
  };
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

export async function deleteAdminUser(userId: string) {
  await request(`/user/${userId}`, { method: "DELETE" });
}

export async function getAdminFeedback(): Promise<FeedbackRequest[]> {
  const data: unknown = await request("/feedback/admin");
  if (!Array.isArray(data)) throw new Error("Некорректный ответ сервера");
  return data as FeedbackRequest[];
}
export async function updateAdminFeedbackStatus(id: string, status: FeedbackStatus) {
  return request(`/feedback/admin/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
}
export async function deleteAdminFeedback(id: string) {
  return request(`/feedback/admin/${id}`, { method: "DELETE" });
}
export function getAdminFeedbackAttachmentUrl(id: string) {
  return `${baseURL}/feedback/admin/${id}/attachment`;
}
