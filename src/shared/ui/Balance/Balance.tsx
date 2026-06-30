import { Wallet } from "lucide-react";
import React from "react";
import { Skeleton } from "../Skeleton/Skeleton";

export interface BalanceProps {
  balance?: number | string | null;
  currency?: string;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const Balance: React.FC<BalanceProps> = ({
  balance = 0,
  currency = "₽",
  icon: Icon = Wallet,
  className = "",
}) => {
  const formattedBalance =
    typeof balance === "number"
      ? new Intl.NumberFormat("ru-RU").format(balance)
      : balance;

  if (!formattedBalance) {
    return <Skeleton className="h-4 w-28 shrink-0" />;
  }
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <Icon color="var(--accent)" size={18} />
      <span className="text-(--foreground)">Баланс:</span>
      <span className="font-semibold text-(--foreground)">
        {formattedBalance} {currency}
      </span>
    </div>
  );
};
