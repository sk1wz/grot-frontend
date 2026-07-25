"use client";

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/api";
import { UserBalance, UserMiniProfile } from "@/entities/user";
import { getRouteTitle } from "@/shared/lib";
import { TextTitle } from "@/shared/ui";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const title = getRouteTitle(pathname);

  async function handleLogout() {
    await logout();

    router.push("/login");
  }

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3">
      <TextTitle className="min-w-0 truncate">{title}</TextTitle>

      <div className="flex items-center gap-4 rounded-full bg-(--surface) px-3 py-2">
        <UserBalance />
        <UserMiniProfile
          slot={
            <button
              type="button"
              aria-label="Выйти"
              onClick={handleLogout}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-(--foreground) transition-colors hover:bg-white/70"
            >
              <LogOut size={16} />
            </button>
          }
        />
      </div>
    </header>
  );
}
