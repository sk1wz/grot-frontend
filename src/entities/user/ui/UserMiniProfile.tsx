"use client";

import type { ReactNode } from "react";
import { Avatar, Skeleton } from "@/shared/ui";
import { useUserStore, type UserType } from "../model";
import Image from "next/image";

export type UserMiniProfileProps = {
  className?: string;
  initialUser?: UserType | null;
  /** Слот справа от email (например, кнопка logout) */
  slot?: ReactNode;
};

export function UserMiniProfile({
  className = "",
  initialUser = null,
  slot,
}: UserMiniProfileProps) {
  const storeUser = useUserStore((state) => state.user);
  const user = storeUser ?? initialUser;

  if (!user) {
    return (
      <div className={`flex min-w-0 items-center gap-2.5 ${className}`}>
        <Skeleton className="size-6 shrink-0 rounded-full!" />
        <Skeleton className="h-4 w-20" />
        {slot ? <Skeleton className="size-6 shrink-0 rounded-full" /> : null}
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <Image
        src="/images/Icon.svg"
        width={35}
        height={35}
        alt=""
        loading="eager"
      />
      <span className="max-w-40 truncate text-xs sm:text-sm text-(--foreground)">
        {user.email}
      </span>
      {slot ? <div className="shrink-0">{slot}</div> : null}
    </div>
  );
}
