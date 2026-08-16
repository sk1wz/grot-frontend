"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useSidebarStore } from "@/entities/sidebar";
import { isActive, sidebarNav } from "@/shared/lib";
import { Logo, LogoName } from "@/shared/ui";
import { useUserStore, UserRole } from "@/entities/user";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "";
  const role = useUserStore((state) => state.user?.role);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  const navigation = isMounted && role === UserRole.ADMIN
    ? [...sidebarNav, { label: "Админ-панель", href: "/dashboard/admin" }]
    : sidebarNav;

  return (
    <>
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="mb-4 flex flex-col items-center gap-2 p-4"
      >
        <Logo />
        <LogoName />
      </Link>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-1">
        {navigation.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center justify-center rounded-[20px] border-2 border-[#ffffff] px-3 py-2.5 text-center text-xs md:text-sm font-medium transition-all shadow-[inset_2_4px_0_rgba(255,1,255,0.8)] ${
                active
                  ? "[background:var(--sidebar-menu-hover)] text-(--foreground) shadow-(--panel-shadow)"
                  : "bg-transparent text-(--foreground) hover:[background:var(--sidebar-menu-hover)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 mb-6 flex flex-col items-center gap-1 p-4 text-center text-sm text-(--foreground)">
        <a className="underline" href="mailto:info@autosledrf.ru">
          info@autosledrf.ru
        </a>
      </div>
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname() ?? "";
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <aside className="hidden h-full w-75 shrink-0 flex-col rounded-tr-[34px] rounded-br-[34px] bg-(--panel-fill) shadow-(--panel-shadow) backdrop-blur-(--panel-blur) min-[1200px]:flex">
        <SidebarContent />
      </aside>

      <div
        className={`fixed inset-0 z-50 min-[1200px]:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={close}
          className={`absolute inset-0 bg-[#3e3c4b]/35 transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-[#e8eef5] shadow-(--panel-shadow) transition-transform duration-200 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={close}
            className="absolute top-3 right-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/50 text-(--foreground) transition-colors hover:bg-white/80"
          >
            <X size={18} />
          </button>

          <SidebarContent onNavigate={close} />
        </aside>
      </div>
    </>
  );
}
