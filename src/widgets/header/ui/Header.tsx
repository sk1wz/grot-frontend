"use client";

import { usePathname } from "next/navigation";
import { useUserStore } from "@/entities/user";
import { getRouteTitle } from "@/shared/lib/main-menu-nav";
import { Balance } from "@/shared/ui";
import { UserMiniProfile } from "@/entities/user/ui";

export function Header() {
  const pathname = usePathname() ?? "";
  const user = useUserStore((state) => state.user);

  return (
    <header className="sticky top-0 z-100 flex h-14 shrink-0 items-center rounded-xl border border-(--border) bg-(--surface) px-4">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="truncate text-lg font-semibold text-(--foreground)">
          {getRouteTitle(pathname)}
        </h1>

        <div className="flex items-center gap-4">
          <Balance balance={user?.balance ?? null} />
          <UserMiniProfile user={user} className="max-w-48" />
        </div>
      </div>
    </header>
  );
}
