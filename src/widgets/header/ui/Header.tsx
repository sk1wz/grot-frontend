"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UserBalance,
  UserMiniProfileWithMenu,
  type UserType,
} from "@/entities/user";
import { logout } from "@/features/auth";
import { SidebarToggle } from "@/widgets/sidebar";

export function Header({ initialUser }: { initialUser: UserType }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;

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
    <header className="flex h-12 shrink-0 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarToggle />
      </div>

      <div className="flex items-center gap-4">
        <UserBalance initialUser={initialUser} />
        <UserMiniProfileWithMenu
          initialUser={initialUser}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
}
