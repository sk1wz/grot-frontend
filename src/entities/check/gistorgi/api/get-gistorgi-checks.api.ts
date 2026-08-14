import { CheckModule, checkSchemasByModule } from "../../model";
import type { GistorgiCheck } from "../model/types";
import { useGistorgiChecksStore } from "../model/useGistorgiChecksStore";
import { baseURL } from "@/shared/api/config";
export async function getGistorgiChecks(): Promise<
  GistorgiCheck[] | undefined
> {
  useGistorgiChecksStore.getState().setLoading(true);
  try {
    const response = await fetch(`${baseURL}/checks/gistorgi`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to load GISTORGI checks");
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid checks response");
    return data.flatMap((item) => {
      const parsed = checkSchemasByModule[CheckModule.GISTORGI].safeParse(item);
      return parsed.success ? [parsed.data] : [];
    });
  } finally {
    useGistorgiChecksStore.getState().setLoading(false);
  }
}
