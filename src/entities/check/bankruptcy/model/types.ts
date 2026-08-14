export type { BankruptcyCheck } from "./schema";
import type { BankruptcyCheck } from "./schema";
export type BankruptcyChecksStore = {
  items: BankruptcyCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: BankruptcyCheck[]) => void;
  upsertCheck: (check: BankruptcyCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
