"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { miniMenu } from "@/shared/lib";
import type { UserType } from "../model";
import { UserMiniProfile } from "./UserMiniProfile";

type UserMiniProfileWithMenuProps = {
  initialUser?: UserType | null;
  slot?: ReactNode;
};

export function UserMiniProfileWithMenu({
  initialUser = null,
  slot,
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

  const menu = (
    <div
      role="menu"
      aria-hidden={!isOpen}
      className={`absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-t-none rounded-br-[22px] rounded-bl-[22px] border border-(--border) bg-white shadow-[0_10px_22px_rgba(62,60,75,0.14)] transition-opacity ${
        isOpen
          ? "visible opacity-100"
          : "invisible pointer-events-none opacity-0"
      }`}
    >
      {miniMenu.map((item) => {
        const content = (
          <>
            <Image
              src={item.iconSrc}
              alt=""
              width={26}
              height={26}
              loading="eager"
              className="size-5 shrink-0"
            />
            <span>{item.label}</span>
          </>
        );
        const className =
          "flex h-11 w-full cursor-pointer items-center gap-2.5 border-b border-(--border) px-2 text-left text-[13px] font-medium text-(--foreground) transition-all hover:bg-(--accent)";

        if (!item.href) {
          return (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className={className}
            >
              {content}
            </button>
          );
        }

        if (item.href.startsWith("/")) {
          return (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className={className}
            >
              {content}
            </Link>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className={className}
          >
            {content}
          </a>
        );
      })}
      {slot ? <div onClickCapture={() => setIsOpen(false)}>{slot}</div> : null}
    </div>
  );

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        onClick={() => setIsOpen((value) => !value)}
        className="cursor-pointer w-full rounded-full outline-none transition-opacity hover:opacity-80"
      >
        <UserMiniProfile initialUser={initialUser} />
      </button>

      {menu}
    </div>
  );
}
