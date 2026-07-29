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
    return <Skeleton className={`h-6 w-20 rounded-full ${className}`} />;
  }

  return (
    <Link
      href={href}
      className={`rounded-full border-3 border-(--accent) px-4 py-2 text-xs font-semibold text-(--foreground) transition-colors hover:bg-(--accent)/70 ${className}`}
    >
      {formatAmount(balance)}
    </Link>
  );
}
