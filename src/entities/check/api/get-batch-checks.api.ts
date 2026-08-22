import { baseURL } from "@/shared/api/config";
import {
  BatchCheckSchema,
  type BatchCheckByModule,
  type CheckModule,
} from "../model";

export async function getBatchChecks<TModule extends CheckModule>(
  path: string,
  module: TModule,
): Promise<BatchCheckByModule<TModule>[]> {
  const response = await fetch(`${baseURL}${path}/batch`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to load batch checks");

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("Invalid batch checks response");

  return data.flatMap((item) => {
    const parsed = BatchCheckSchema.safeParse(item);
    return parsed.success && parsed.data.module === module
      ? [parsed.data as BatchCheckByModule<TModule>]
      : [];
  });
}
