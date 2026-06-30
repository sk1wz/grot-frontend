import { create } from "zustand";
import { BalanceTransactionsStore } from "./types";

const initialState = {
  items: [],
  total: 0,
  isLoading: false,
};

export const useBalanceTransactionsStore = create<BalanceTransactionsStore>()(
  (set) => ({
    ...initialState,
    setTransactions: (response) =>
      set({
        items: response.items,
        total: response.total,
      }),

    setLoading: (isLoading) => set({ isLoading }),
  })
);
