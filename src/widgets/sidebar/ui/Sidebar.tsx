"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/shared/lib/main-menu-nav";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="flex h-full w-65 shrink-0 flex-col border border-(--border) bg-(--surface)">
      <div className="flex h-14 shrink-0 items-center border-b border-(--border) px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="InfoFusion"
            width={28}
            height={28}
            className="size-7"
          />
          <span className="text-sm font-semibold text-(--foreground)">
            InfoFusion
          </span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {sidebarNav.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-(--accent) text-(--accent-foreground)"
                  : "text-(--foreground) hover:bg-(--accent)/50"
              }`}
            >
              <Icon className="size-4 shrink-0 text-(--icon-color)" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
