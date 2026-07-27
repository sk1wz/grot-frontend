"use client";

import { Menu } from "lucide-react";
import { useSidebarStore } from "@/entities/sidebar";

export function SidebarToggle() {
  const open = useSidebarStore((state) => state.open);

  return (
    <button
      type="button"
      aria-label="Открыть меню"
      onClick={open}
      className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-(--surface) text-(--foreground) transition-colors hover:bg-white/70 md:hidden"
    >
      <Menu size={20} />
    </button>
  );
}
