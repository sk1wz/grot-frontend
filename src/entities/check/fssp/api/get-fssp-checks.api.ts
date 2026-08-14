import { CheckModule, checkSchemasByModule } from "../../model";
import type { FsspCheck } from "../model/types";
import { useFsspChecksStore } from "../model/useFsspChecksStore";
import { baseURL } from "@/shared/api/config";
export async function getFsspChecks(): Promise<FsspCheck[] | undefined> {
  useFsspChecksStore.getState().setLoading(true);
  try {
    const response = await fetch(`${baseURL}/checks/fssp`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load FSSP checks");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");
    return data.flatMap((item) => {
      const parsed = checkSchemasByModule[CheckModule.FSSP].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useFsspChecksStore.getState().setLoading(false);
  }
}
