import { baseURL } from "@/shared/api/config";
import { CheckModule, checkSchemasByModule } from "../../model";
import type { LimitationCheck } from "../model/types";
import { useLimitationChecksStore } from "../model/useLimitationChecksStore";

export async function getLimitationChecks(): Promise<LimitationCheck[] | undefined> {
  useLimitationChecksStore.getState().setLoading(true);

  try {
    const response = await fetch(`${baseURL}/checks/limitation`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to load limitation checks");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");

    return data.flatMap((item) => {
      const parsed = checkSchemasByModule[CheckModule.LIMITATION].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useLimitationChecksStore.getState().setLoading(false);
  }
}
