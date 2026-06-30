"use client";

import { usePathname } from "next/navigation";
import { sidebarNav } from "@/shared/lib/sidebar-nav";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarNavItemLink } from "./SidebarNavItem";

export function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-(--border) bg-(--surface)">
      <div className="border-b border-(--border) max-h-[56px] h-full">
        <SidebarLogo />
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2">
        {sidebarNav.map((item) => (
          <SidebarNavItemLink key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}
