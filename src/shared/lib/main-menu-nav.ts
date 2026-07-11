import type { LucideIcon } from "lucide-react";
import { ChartBar, ClipboardList, History } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const sidebarNav: NavItem[] = [
  { label: "Проверки", href: "/dashboard", icon: ClipboardList },
  {
    label: "История проверок",
    href: "/dashboard/check-history",
    icon: History,
  },
  {
    label: "Статистика",
    href: "/dashboard/statistics",
    icon: ChartBar,
  },
];

export function getRouteTitle(pathname: string): string {
  const path = pathname.split("?")[0] ?? pathname;

  const allItems = [...sidebarNav].sort(
    (a, b) => b.href.length - a.href.length
  );

  for (const item of allItems) {
    if (path === item.href || path.startsWith(`${item.href}/`)) {
      return item.label;
    }
  }

  return "Панель";
}
