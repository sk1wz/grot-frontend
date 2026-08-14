export type { FsspCheck } from "./schema";
import type { FsspCheck } from "./schema";
export type FsspChecksStore = {
  items: FsspCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: FsspCheck[]) => void;
  upsertCheck: (check: FsspCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
