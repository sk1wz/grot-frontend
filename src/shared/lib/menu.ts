export type NavItem = {
  label: string;
  href: string;
};

export const sidebarNav: NavItem[] = [
  { label: "ГИБДД", href: "/dashboard/gibdd" },
  { label: "ФССП", href: "/dashboard/fssp" },
  { label: "Банкротства", href: "/dashboard/bankruptcy" },
  { label: "ИНН по паспорту", href: "/dashboard/inn-by-passport" },
  { label: "ГИС торги", href: "/dashboard/gis-torgi" },
  { label: "Ограничения", href: "/dashboard/limitations" },
  // { label: "ФгИС такси", href: "/dashboard/fgis-taxi" },
  // { label: "Оценка стоимости авто", href: "/dashboard/car-valuation" },
  // {
  //   label: "Федеральный реестр инвалидов",
  //   href: "/dashboard/disability-registry",
  // },
  { label: "Тарифы", href: "/dashboard/tariffs" },
  { label: "О Сервисе", href: "/dashboard/about" },
];

export const menuItems: NavItem[] = [
  { label: "История транзакций", href: "/dashboard/deposit-history" },
];

export type MiniMenuItem = {
  label: string;
  iconSrc: string;
  href?: string;
};

export const miniMenu: MiniMenuItem[] = [
  {
    label: "Смена пароля",
    iconSrc: "/images/Icon_passwordChange.svg",
    href: "/dashboard/change-password",
  },
  {
    label: "Транзакции",
    iconSrc: "/images/Icon_Ruble.svg",
    href: "/dashboard/deposit-history",
  },
  {
    label: "Поддержка",
    iconSrc: "/images/Icon_info.svg",
    href: "mailto:info@autosledrf.ru",
  },
];

export function getRouteTitle(pathname: string): string {
  const path = pathname.split("?")[0] ?? pathname;

  const allItems = [...sidebarNav, ...menuItems].sort(
    (a, b) => b.href.length - a.href.length
  );

  for (const item of allItems) {
    if (path === item.href || path.startsWith(`${item.href}/`)) {
      return item.label;
    }
  }

  return "Панель";
}

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
