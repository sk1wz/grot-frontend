import { create } from "zustand";
import { SidebarStore } from "./types";

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
