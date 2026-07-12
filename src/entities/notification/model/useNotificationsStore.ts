import { create } from "zustand";
import { NotificationsStore } from "./types";

const initialState = {
  items: [],
  isLoading: false,
  isInitialized: false,
};

export const useNotificationsStore = create<NotificationsStore>()((set) => ({
  ...initialState,
  setNotifications: (items) =>
    set({
      items,
      isInitialized: true,
    }),
  upsertNotification: (notification) =>
    set((state) => ({
      items: [
        notification,
        ...state.items.filter((item) => item.id !== notification.id),
      ],
    })),
  markAllRead: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, isRead: true })),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setInitialized: (isInitialized) => set({ isInitialized }),
}));
