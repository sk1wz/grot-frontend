import { CheckModule, checkSchemasByModule } from "../../model";
import type { BankruptcyCheck } from "../model/types";
import { useBankruptcyChecksStore } from "../model/useBankruptcyChecksStore";
import { baseURL } from "@/shared/api/config";
export async function getBankruptcyChecks(): Promise<
  BankruptcyCheck[] | undefined
> {
  useBankruptcyChecksStore.getState().setLoading(true);
  try {
    const response = await fetch(`${baseURL}/checks/bankruptcy`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load bankruptcy checks");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");
    return data.flatMap((item) => {
      const parsed =
        checkSchemasByModule[CheckModule.BANKRUPTCY].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useBankruptcyChecksStore.getState().setLoading(false);
  }
}
