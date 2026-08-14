export type { InnCheck } from "./schema";
import type { InnCheck } from "./schema";
export type InnChecksStore = {
  items: InnCheck[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: InnCheck[]) => void;
  upsertCheck: (check: InnCheck) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};
