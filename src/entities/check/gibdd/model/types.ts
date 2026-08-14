export type { GibddCheck } from "./schema";
import type { GibddCheck } from "./schema";

export type GibddChecksStore = {
  items: GibddCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: GibddCheck[]) => void;
  upsertCheck: (check: GibddCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
