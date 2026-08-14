export type { GistorgiCheck } from "./schema";
import type { GistorgiCheck } from "./schema";
export type GistorgiChecksStore = {
  items: GistorgiCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: GistorgiCheck[]) => void;
  upsertCheck: (check: GistorgiCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
