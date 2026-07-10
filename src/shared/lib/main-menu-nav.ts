import type { LucideIcon } from "lucide-react";
import { Bell, History, Settings } from "lucide-react";

export type MenuNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const mainMenuNav: MenuNavItem[] = [
  { label: "Уведомления", href: "/dashboard/notifications", icon: Bell },
  {
    label: "История операций",
    href: "/dashboard/deposit-history",
    icon: History,
  },
  { label: "Настройки аккаунта", href: "/dashboard/settings", icon: Settings },
];

export function getRouteTitle(pathname: string): string {
  const path = pathname.split("?")[0] ?? pathname;
  const items = mainMenuNav.sort((a, b) => b.href.length - a.href.length);
  for (const item of items) {
    if (path === item.href || path.startsWith(`${item.href}/`))
      return item.label;
  }
  return "Панель";
}
