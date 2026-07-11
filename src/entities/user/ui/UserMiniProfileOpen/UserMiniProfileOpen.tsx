"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { logout } from "@/features/auth/api";
import { UserType } from "../../model";
import { UserMiniProfile } from "../UserMiniProfile/UserMiniProfile";
import { Balance } from "@/shared/ui";
import { menuItems } from "@/shared/lib";

export type UserMiniProfileOpenProps = {
  className?: string;
  user?: UserType | null;
};

export function UserMiniProfileOpen({
  className = "",
  user,
}: UserMiniProfileOpenProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);

    try {
      await logout();
    } catch {
      // logout() всё равно чистит локальную сессию в finally
    } finally {
      router.replace("/login");
    }
  };

  if (!user) {
    return <UserMiniProfile user={user} className={className} />;
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex min-w-0 cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 outline-none transition-colors hover:bg-(--field)"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <UserMiniProfile user={user} />
        <ChevronDown
          className={`size-4 shrink-0 text-(--muted) transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-lg border border-(--border) bg-(--surface) shadow-lg divide-y divide-(--border)"
        >
          <div className="px-4 py-3">
            <UserMiniProfile user={user} />
          </div>

          <div className="px-4 py-3">
            <Balance balance={user.balance} />
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-(--foreground) transition-colors hover:bg-(--field)"
              >
                <Icon
                  size={18}
                  className="size-4 shrink-0 text-(--icon-color)"
                />
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            role="menuitem"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-(--foreground) transition-colors hover:bg-(--field) disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut size={18} className=" shrink-0 text-(--icon-color)" />
            Выйти из аккаунта
          </button>
        </div>
      )}
    </div>
  );
}
