"use client";

import { Avatar, Skeleton } from "@/shared/ui";
import { useUserStore } from "../model";

export type UserMiniProfileProps = {
  className?: string;
};

export function UserMiniProfile({ className = "" }: UserMiniProfileProps) {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <div className={`flex min-w-0 items-center gap-2.5 pr-1 ${className}`}>
        <Skeleton className="size-8 shrink-0 rounded-full" />
        <Skeleton className="h-4 w-36" />
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
    </div>
  );
}
