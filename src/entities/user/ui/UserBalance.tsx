"use client";

import Link from "next/link";
import { formatAmount } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import { useUserStore, type UserType } from "../model";

export type UserBalanceProps = {
  className?: string;
  href?: string;
  initialUser?: UserType | null;
};

export function UserBalance({
  className = "",
  initialUser = null,
}: UserBalanceProps) {
  const storeUser = useUserStore((state) => state.user);
  const user = storeUser ?? initialUser;

  if (!user) {
    return <Skeleton className={`h-8 w-20 rounded-full! ${className}`} />;
  }

  return (
    <span
      className={`rounded-full border-3 border-(--accent) px-4 py-2 text-xs font-semibold text-(--foreground) transition-colors hover:bg-(--accent) ${className}`}
    >
      {formatAmount(user.balance)}
    </span>
  );
}
