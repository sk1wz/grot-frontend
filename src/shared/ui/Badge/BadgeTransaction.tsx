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
    "bg-emerald-50 text-emerald-700 ring-emerald-200",
  [BalanceTransactionStatus.BALANCE_REFUND]:
    "bg-sky-50 text-sky-700 ring-sky-200",
  [BalanceTransactionStatus.BALANCE_FAILED]:
    "bg-rose-50 text-rose-700 ring-rose-200",
  [BalanceTransactionStatus.BALANCE_PURCHASE]:
    "bg-amber-50 text-amber-700 ring-amber-200",
};

export function BadgeTransaction({ status, className }: BadgeTransactionProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]} ${className ?? ""}`}
    >
      {BalanceTransactionStatusLabel[status]}
    </span>
  );
}
