import type { LucideIcon } from "lucide-react";
import { HistoryIcon, Home, LineChart, SearchIcon } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const sidebarNav: SidebarNavItem[] = [
  { label: "Главная", href: "/dashboard", icon: Home },
  {
    label: "Проверки",
    href: "/dashboard/workspace",
    icon: SearchIcon,
  },
  {
    label: "История проверок",
    href: "/dashboard/search-history",
    icon: HistoryIcon,
  },
  { label: "Статистика", href: "/dashboard/statistics", icon: LineChart },
];

export function isSidebarNavActive(pathname: string, href: string): boolean {
  const path = pathname.split("?")[0] ?? pathname;

  if (href === "/dashboard") {
    return path === "/dashboard" || path === "/dashboard/";
  }

  return path === href || path.startsWith(`${href}/`);
}
