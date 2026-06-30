"use client";

import { usePathname } from "next/navigation";
import { HeaderUserMenu } from "./HeaderUserMenu";
import { getRouteTitle } from "@/shared/lib";

export function Header() {
  const pathname = usePathname() ?? "";
  const title = getRouteTitle(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center bg-(--surface) border-b border-(--border) px-4 sticky top-0 z-100">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-sm font-semibold tracking-tight text-(--foreground)">
          {title}
        </h1>
        <HeaderUserMenu />
      </div>
    </header>
  );
}
