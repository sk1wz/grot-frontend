import { create } from "zustand";
import { ChecksStore } from "./types";

const initialState = {
  items: [],
  isLoading: false,
  isInitialized: false,
};

export const useChecksStore = create<ChecksStore>()((set) => ({
  ...initialState,
  setChecks: (items) =>
    set({
      items,
      isInitialized: true,
    }),
  upsertCheck: (check) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === check.id);

      if (!exists) {
        return {
          items: [check, ...state.items],
        };
      }

      return {
        items: state.items.map((item) => (item.id === check.id ? check : item)),
      };
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
  reset: () => set(initialState),
}));
