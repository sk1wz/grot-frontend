"use client";

import Link from "next/link";
import {
  isSidebarNavActive,
  type SidebarNavItem,
} from "@/shared/lib/sidebar-nav";
import { Text } from "@/shared/ui";

type SidebarNavItemProps = {
  item: SidebarNavItem;
  pathname: string;
};

export function SidebarNavItemLink({ item, pathname }: SidebarNavItemProps) {
  const Icon = item.icon;
  const isActive = isSidebarNavActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "group flex items-center gap-3 rounded-xl px-2 py-1 text-(--foreground) outline-none transition-colors",
        isActive ? "bg-(--accent)/20" : "hover:bg-(--field)",
      ].join(" ")}
    >
      <span
        className={[
          "flex size-8 shrink-0 items-center justify-center rounded-xl transition-colors",
          isActive ? "bg-(--accent)/30" : "group-hover:bg-(--accent)/10",
        ].join(" ")}
      >
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <Text
        className={[
          "truncate text-sm",
          isActive ? "font-medium" : "font-normal",
        ].join(" ")}
      >
        {item.label}
      </Text>
    </Link>
  );
}
