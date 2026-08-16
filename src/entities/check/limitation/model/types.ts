import type { LimitationCheck } from "./schema";

export type { LimitationCheck } from "./schema";

export type LimitationChecksStore = {
  items: LimitationCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: LimitationCheck[]) => void;
  upsertCheck: (check: LimitationCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
