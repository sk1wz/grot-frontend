export type SidebarStore = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
