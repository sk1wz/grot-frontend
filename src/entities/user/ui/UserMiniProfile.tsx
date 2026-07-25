"use client";

import type { ReactNode } from "react";
import { Avatar, Skeleton } from "@/shared/ui";
import { useUserStore } from "../model";

export type UserMiniProfileProps = {
  className?: string;
  /** Слот справа от email (например, кнопка logout) */
  slot?: ReactNode;
};

export function UserMiniProfile({
  className = "",
  slot,
}: UserMiniProfileProps) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <div className={`flex min-w-0 items-center gap-2.5 pr-1 ${className}`}>
        <Skeleton className="size-6 shrink-0 rounded-full" />
        <Skeleton className="h-4 w-36" />
        {slot ? <Skeleton className="size-6 shrink-0 rounded-full" /> : null}
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 items-center gap-2.5 pr-1 ${className}`}>
      <Avatar
        src={user.picture}
        alt={user.email}
        fallbackLabel={user.email}
        size="sm"
      />
      <span className="max-w-[200px] truncate text-sm text-(--foreground)">
        {user.email}
      </span>
      {slot ? <div className="ml-1 shrink-0">{slot}</div> : null}
    </div>
  );
}
