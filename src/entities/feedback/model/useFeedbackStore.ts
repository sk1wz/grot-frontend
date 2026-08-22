import { create } from "zustand";
import type { FeedbackRequest } from "./types";

type FeedbackStore = {
  items: FeedbackRequest[];
  isLoading: boolean;
  isInitialized: boolean;
  setItems: (items: FeedbackRequest[]) => void;
  upsert: (item: FeedbackRequest) => void;
  remove: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
};

export const useFeedbackStore = create<FeedbackStore>()((set) => ({
  items: [],
  isLoading: false,
  isInitialized: false,
  setItems: (items) => set({ items, isInitialized: true }),
  upsert: (item) => set((state) => ({
    items: state.items.some((current) => current.id === item.id)
      ? state.items.map((current) => current.id === item.id ? item : current)
      : [item, ...state.items],
  })),
  remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
}));
