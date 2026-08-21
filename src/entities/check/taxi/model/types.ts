export type { TaxiCheck } from "./schema";
import type { TaxiCheck } from "./schema";

export type TaxiChecksStore = {
  items: TaxiCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: TaxiCheck[]) => void;
  upsertCheck: (check: TaxiCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
