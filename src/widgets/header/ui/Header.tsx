"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth";
import { UserBalance, UserMiniProfile, type UserType } from "@/entities/user";
import { SidebarToggle } from "@/widgets/sidebar";

export function Header({ initialUser }: { initialUser: UserType }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 h-12">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarToggle />
      </div>

      <div className="flex items-center gap-4 rounded-full bg-(--surface)">
        <UserBalance initialUser={initialUser} />
        <UserMiniProfile
          initialUser={initialUser}
          slot={
            <button
              type="button"
              aria-label="Выйти"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex size-8 cursor-pointer items-center justify-center rounded-full text-(--foreground) transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={16} />
            </button>
          }
        />
      </div>
    </header>
  );
}
