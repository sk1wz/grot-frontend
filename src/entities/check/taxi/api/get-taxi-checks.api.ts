import { CheckModule, checkSchemasByModule } from "../../model";
import type { TaxiCheck } from "../model/types";
import { useTaxiChecksStore } from "../model/useTaxiChecksStore";
import { baseURL } from "@/shared/api/config";
export async function getTaxiChecks(): Promise<TaxiCheck[] | undefined> {
  useTaxiChecksStore.getState().setLoading(true);
  try {
    const response = await fetch(`${baseURL}/checks/taxi`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load TAXI checks");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");
    return data.flatMap((item) => {
      const parsed = checkSchemasByModule[CheckModule.TAXI].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useTaxiChecksStore.getState().setLoading(false);
  }
}
