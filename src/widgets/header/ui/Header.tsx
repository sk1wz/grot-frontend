"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/api";
import { UserBalance, UserMiniProfile } from "@/entities/user";
import { SidebarToggle } from "@/widgets/sidebar";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    await logout();

    router.push("/login");
  }

  return (
    <header className="flex shrink-0 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarToggle />
      </div>

      <div className="flex items-center gap-4 rounded-full bg-(--surface)">
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
