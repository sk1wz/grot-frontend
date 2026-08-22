import { create } from "zustand";
import type { BatchCheckByModule } from "./base-schema";
import type { CheckModule } from "./types";

type BatchChecksStore<TModule extends CheckModule> = {
  batches: BatchCheckByModule<TModule>[];
  isLoading: boolean;
  isInitialized: boolean;
  setBatches: (batches: BatchCheckByModule<TModule>[]) => void;
  upsertBatch: (batch: BatchCheckByModule<TModule>) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
};

export function createBatchChecksStore<TModule extends CheckModule>() {
  const initialState = {
    batches: [] as BatchCheckByModule<TModule>[],
    isLoading: false,
    isInitialized: false,
  };

  return create<BatchChecksStore<TModule>>()((set) => ({
    ...initialState,
    setBatches: (batches) => set({ batches, isInitialized: true }),
    upsertBatch: (batch) =>
      set((state) => ({
        batches: state.batches.some((item) => item.id === batch.id)
          ? state.batches.map((item) => (item.id === batch.id ? batch : item))
          : [batch, ...state.batches],
      })),
    setLoading: (isLoading) => set({ isLoading }),
    reset: () => set(initialState),
  }));
}
