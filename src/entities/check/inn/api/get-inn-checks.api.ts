import { CheckModule, checkSchemasByModule } from "../../model";
import type { InnCheck } from "../model/types";
import { useInnChecksStore } from "../model/useInnChecksStore";
import { baseURL } from "@/shared/api/config";
export async function getInnChecks(): Promise<InnCheck[] | undefined> {
  useInnChecksStore.getState().setLoading(true);
  try {
    const response = await fetch(`${baseURL}/checks/inn`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load INN checks");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");
    return data.flatMap((item) => {
      const parsed = checkSchemasByModule[CheckModule.INN].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useInnChecksStore.getState().setLoading(false);
  }
}
