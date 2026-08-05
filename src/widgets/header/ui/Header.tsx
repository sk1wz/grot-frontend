"use client";

import Image from "next/image";
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

  const logoutSlot = (
    <button
      type="button"
      role="menuitem"
      disabled={isLoggingOut}
      onClick={handleLogout}
      className="flex h-11 w-full cursor-pointer items-center gap-2.5 px-3 text-left text-[13px] font-medium text-(--foreground) transition-all hover:bg-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Image src="/images/Icon_logout.svg" alt="" width={27} height={27} className="size-5 shrink-0" />
      <span>Выйти</span>
    </button>
  );

  return (
    <header className="flex h-12 shrink-0 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarToggle />
      </div>

      <div className="flex items-center gap-4">
        <UserBalance initialUser={initialUser} />
        <UserMiniProfileWithMenu
          initialUser={initialUser}
          slot={logoutSlot}
        />
      </div>
    </header>
  );
}
