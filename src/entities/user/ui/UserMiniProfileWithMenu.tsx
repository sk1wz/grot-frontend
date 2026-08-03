"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { UserType } from "../model";
import { UserMiniProfile } from "./UserMiniProfile";

type UserMiniProfileWithMenuProps = {
  initialUser?: UserType | null;
  onLogout?: () => void;
  isLoggingOut?: boolean;
};

export function UserMiniProfileWithMenu({
  initialUser = null,
  onLogout,
  isLoggingOut = false,
}: UserMiniProfileWithMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative w-50 bg-(--surface) rounded-full">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        onClick={() => setIsOpen((value) => !value)}
        className="cursor-pointer rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-(--accent-foreground)/30"
      >
        <UserMiniProfile initialUser={initialUser} />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-50 overflow-hidden rounded-t-none rounded-br-[22px] rounded-bl-[22px] border border-[#dce5ef] bg-white shadow-[0_10px_22px_rgba(62,60,75,0.14)]"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex h-11 w-full cursor-pointer items-center gap-2.5 border-b border-[#e4ebf3] px-3 text-left text-[13px] font-medium text-[#3e3c4b] transition-colors hover:bg-[#f7f9fc]"
          >
            <Image src="/images/Icon_passwordChange.svg" alt="" width={26} height={26} className="size-5 shrink-0" />
            <span>Смена пароля</span>
          </button>
          <Link
            href="/dashboard/deposit-history"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex h-11 items-center gap-2.5 border-b border-[#e4ebf3] px-3 text-[13px] font-medium text-[#3e3c4b] transition-colors hover:bg-[#f7f9fc]"
          >
            <Image src="/images/Icon_Ruble.svg" alt="" width={26} height={26} className="size-5 shrink-0" />
            <span>Транзакции</span>
          </Link>
          <a
            href="mailto:info@autosledrf.ru"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex h-11 items-center gap-2.5 border-b border-[#e4ebf3] px-3 text-[13px] font-medium text-[#3e3c4b] transition-colors hover:bg-[#f7f9fc]"
          >
            <Image src="/images/Icon_info.svg" alt="" width={26} height={26} className="size-5 shrink-0" />
            <span>Поддержка</span>
          </a>
          <button
            type="button"
            role="menuitem"
            disabled={isLoggingOut}
            onClick={() => {
              setIsOpen(false);
              onLogout?.();
            }}
            className="flex h-11 w-full cursor-pointer items-center gap-2.5 px-3 text-left text-[13px] font-medium text-[#3e3c4b] transition-colors hover:bg-[#f7f9fc] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Image src="/images/Icon_logout.svg" alt="" width={27} height={27} className="size-5 shrink-0" />
            <span>Выйти</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
