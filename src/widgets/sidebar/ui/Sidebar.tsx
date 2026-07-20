"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarNav } from "@/shared/lib/main-menu-nav";
import { Logo, LogoName } from "@/shared/ui";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="flex h-full w-75 shrink-0 flex-col rounded-tr-[34px] rounded-br-[34px] bg-(--panel-fill) p-4 shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
      <div className="">
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center gap-2"
        >
          <Logo />
          <LogoName />
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
