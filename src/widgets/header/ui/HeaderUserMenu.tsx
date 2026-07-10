"use client";

import { UserMiniProfile, useUserStore } from "@/entities/user";
import { logout } from "@/features/auth/api";

import { WalletWithDeposit } from "@/features/balance";
import { mainMenuNav } from "@/shared/lib/main-menu-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
} from "@/shared/ui";
import { ChevronDown, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function HeaderUserMenu() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const user = useUserStore((s) => s.user);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const request = logout();
    try {
      await toast.promise(request, {
        pending: "Выход из системы...",
        success: "Вы успешно вышли из системы",
        error: {
          render: ({ data }: { data: Error }) => data.message,
        },
      });
      router.push("/logout");
    } catch {
      setIsLoggingOut(false);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 outline-none transition-colors hover:bg-(--accent)/10"
          aria-label="Меню профиля"
        >
          <UserMiniProfile className="gap-3" user={user} />
          <ChevronDown className="shrink-0 text-(--foreground)" size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="font-normal">
          <UserMiniProfile className="gap-3" user={user} />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>
          <WalletWithDeposit user={user} />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {mainMenuNav.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.href}>
              <DropdownMenuItem asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <Icon size={18} className="text-(--accent)" />
                  <Text>{item.label}</Text>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          );
        })}

        <DropdownMenuItem
          disabled={isLoggingOut}
          onSelect={() => void handleLogout()}
        >
          <LogOutIcon size={18} className="text-(--accent)" />
          <Text>{isLoggingOut ? "Выход из системы…" : "Выйти из системы"}</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
