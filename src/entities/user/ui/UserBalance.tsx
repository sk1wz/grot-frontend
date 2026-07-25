"use client";

import Link from "next/link";
import { formatAmount } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import { useUserStore } from "../model";

export type UserBalanceProps = {
  className?: string;
  href?: string;
};

export function UserBalance({
  className = "",
  href = "/dashboard/deposit-history",
}: UserBalanceProps) {
  const balance = useUserStore((state) => state.user?.balance);

  if (!balance) {
    return <Skeleton className={`h-5 w-24 rounded-full ${className}`} />;
  }

  return (
    <Link
      href={href}
      className={`rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-(--foreground) transition-colors hover:bg-white ${className}`}
    >
      {formatAmount(balance)}
    </Link>
  );
}
