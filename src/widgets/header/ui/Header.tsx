"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore, UserMiniProfile } from "@/entities/user";
import { formatAmount, getRouteTitle } from "@/shared/lib";
import { TextTitle } from "@/shared/ui";

export function Header() {
  const pathname = usePathname();
  const title = getRouteTitle(pathname);
  const balance = useUserStore((state) => state.user?.balance);

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3">
      <TextTitle className="min-w-0 truncate">{title}</TextTitle>

      <div className="flex items-center gap-4 rounded-full bg-(--panel-fill) px-3 py-2 shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
        <Link
          href="/dashboard/deposit-history"
          className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-(--foreground) transition-colors hover:bg-white"
        >
          {formatAmount(balance ?? 0)}
        </Link>

        <UserMiniProfile />
      </div>
    </header>
  );
}
