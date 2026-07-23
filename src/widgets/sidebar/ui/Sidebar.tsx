"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarNav } from "@/shared/lib/main-menu-nav";
import { Logo, LogoName } from "@/shared/ui";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="flex h-full w-75 shrink-0 flex-col rounded-tr-[34px] rounded-br-[34px] p-4 bg-(--panel-fill) shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
      <Link href="/dashboard" className="mb-4 flex flex-col items-center gap-2">
        <Logo />
        <LogoName />
      </Link>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-1">
        {sidebarNav.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-center rounded-[20px] border-2 border-[#ffffff] px-3 py-2.5 text-center text-sm font-medium transition-colors shadow-[inset_2_4px_0_rgba(255,1,255,0.8)] ${
                active
                  ? "bg-white/70 text-(--foreground)"
                  : "bg-white/25 text-(--foreground) hover:bg-white/45"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 flex flex-col items-center gap-1 text-center text-sm text-(--foreground)">
        <a className="font-medium" href="tel:+79999999999">
          +7 999 999 99 99
        </a>
        <a className="underline" href="mailto:info@autosledrf.ru">
          info@autosledrf.ru
        </a>
      </div>
    </aside>
  );
}
