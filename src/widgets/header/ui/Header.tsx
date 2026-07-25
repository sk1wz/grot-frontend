"use client";

import { usePathname } from "next/navigation";
import { UserBalance, UserMiniProfile } from "@/entities/user";
import { getRouteTitle } from "@/shared/lib";
import { TextTitle } from "@/shared/ui";

export function Header() {
  const pathname = usePathname();
  const title = getRouteTitle(pathname);

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3">
      <TextTitle className="min-w-0 truncate">{title}</TextTitle>

      <div className="flex items-center gap-4 rounded-full bg-(--panel-fill) px-3 py-2 shadow-(--panel-shadow) backdrop-blur-(--panel-blur)">
        <UserBalance />
        <UserMiniProfile />
      </div>
    </header>
  );
}
