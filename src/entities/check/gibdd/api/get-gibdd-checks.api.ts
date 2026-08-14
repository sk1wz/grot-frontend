import { CheckModule, checkSchemasByModule } from "../../model";
import type { GibddCheck } from "../model/types";
import { useGibddChecksStore } from "../model/useGibddChecksStore";
import { baseURL } from "@/shared/api/config";

export async function getGibddChecks(): Promise<GibddCheck[] | undefined> {
  const store = useGibddChecksStore.getState();
  store.setLoading(true);

  try {
    const response = await fetch(`${baseURL}/checks/gibdd`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load GIBDD checks");

    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");

    return data.flatMap((item) => {
      const parsed = checkSchemasByModule[CheckModule.GIBDD].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useGibddChecksStore.getState().setLoading(false);
  }
}
