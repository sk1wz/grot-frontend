import { create } from "zustand";
import { BalanceTransactionsStore } from "./types";

const initialState = {
  items: [],
  total: 0,
  isLoading: false,
  isInitialized: false,
};

export const useBalanceTransactionsStore = create<BalanceTransactionsStore>()(
  (set) => ({
    ...initialState,
    setTransactions: (response) =>
      set({
        items: response.items,
        total: response.total ?? response.items.length,
        isInitialized: true,
      }),
    setTransaction: (transaction) =>
      set((state) => ({
        items: [
          transaction,
          ...state.items.filter((item) => item.id !== transaction.id),
        ],
        total: state.items.some((item) => item.id === transaction.id)
          ? state.total
          : state.total + 1,
      })),
    setLoading: (isLoading) => set({ isLoading }),
    setInitialized: (isInitialized) => set({ isInitialized }),
  })
);
