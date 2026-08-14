import {
  BalanceTransactionStatus,
  BalanceTransactionStatusLabel,
} from "@/entities/balance";

type BadgeTransactionProps = {
  status: BalanceTransactionStatus;
  className?: string;
};

const statusStyles: Record<BalanceTransactionStatus, string> = {
  [BalanceTransactionStatus.BALANCE_TOPUP]:
    "bg-emerald-50 text-[#3E3C4B] ring-emerald-200",
  [BalanceTransactionStatus.BALANCE_REFUND]:
    "bg-yellow-50 text-[#3E3C4B] ring-yellow-200",
  [BalanceTransactionStatus.BALANCE_FAILED]:
    "bg-rose-50 text-[#3E3C4B] ring-rose-200",
  [BalanceTransactionStatus.BALANCE_PURCHASE]:
    "bg-orange-200 text-[#3E3C4B] ring-orange-200",
};

export function BadgeTransaction({ status, className }: BadgeTransactionProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ${
        statusStyles[status]
      } ${className ?? ""}`}
    >
      {BalanceTransactionStatusLabel[status]}
    </span>
  );
}
