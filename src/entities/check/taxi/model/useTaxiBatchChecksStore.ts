import { createBatchChecksStore } from "../../model/create-batch-checks-store";
import { CheckModule } from "../../model/types";

export const useTaxiBatchChecksStore =
  createBatchChecksStore<CheckModule.TAXI>();
