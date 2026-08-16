import { create } from "zustand";
import type { LimitationChecksStore } from "./types";

const initialState = { items: [], isLoading: false, isInitialized: false };

export const useLimitationChecksStore = create<LimitationChecksStore>()((set) => ({
  ...initialState,
  setChecks: (items) => set({ items, isInitialized: true }),
  upsertCheck: (check) =>
    set((state) => ({
      items: state.items.some((item) => item.id === check.id)
        ? state.items.map((item) => (item.id === check.id ? check : item))
        : [check, ...state.items],
    })),
  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(initialState),
}));
