import {
  BalanceTransactionStatus,
  type BalanceTransactionType,
} from "@/entities/balance";

export const TRANSACTION_CHART_COLORS: Record<
  BalanceTransactionStatus,
  string
> = {
  [BalanceTransactionStatus.BALANCE_TOPUP]: "#338830",
  [BalanceTransactionStatus.BALANCE_PURCHASE]: "#e11d48",
  [BalanceTransactionStatus.BALANCE_REFUND]: "#0284c7",
  [BalanceTransactionStatus.BALANCE_FAILED]: "#78716c",
};

export const TRANSACTION_TYPE_LABELS: Record<BalanceTransactionStatus, string> =
  {
    [BalanceTransactionStatus.BALANCE_TOPUP]: "Пополнения",
    [BalanceTransactionStatus.BALANCE_PURCHASE]: "Списания",
    [BalanceTransactionStatus.BALANCE_REFUND]: "Возвраты",
    [BalanceTransactionStatus.BALANCE_FAILED]: "Ошибки",
  };

export type TransactionSummary = {
  totalTopup: number;
  totalPurchase: number;
  totalRefund: number;
  totalFailed: number;
  totalCount: number;
  netChange: number;
};

export type TransactionTypeChartItem = {
  status: BalanceTransactionStatus;
  label: string;
  amount: number;
  count: number;
  color: string;
};

export type TransactionMonthChartItem = {
  month: string;
  monthLabel: string;
  topup: number;
  purchase: number;
  refund: number;
};

export type TransactionStats = {
  summary: TransactionSummary;
  byType: TransactionTypeChartItem[];
  byMonth: TransactionMonthChartItem[];
};

function getMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getMonthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("ru-RU", {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

export function buildTransactionStats(
  items: BalanceTransactionType[]
): TransactionStats {
  const summary: TransactionSummary = {
    totalTopup: 0,
    totalPurchase: 0,
    totalRefund: 0,
    totalFailed: 0,
    totalCount: items.length,
    netChange: 0,
  };

  const amountsByStatus: Record<BalanceTransactionStatus, number> = {
    [BalanceTransactionStatus.BALANCE_TOPUP]: 0,
    [BalanceTransactionStatus.BALANCE_PURCHASE]: 0,
    [BalanceTransactionStatus.BALANCE_REFUND]: 0,
    [BalanceTransactionStatus.BALANCE_FAILED]: 0,
  };

  const countsByStatus: Record<BalanceTransactionStatus, number> = {
    [BalanceTransactionStatus.BALANCE_TOPUP]: 0,
    [BalanceTransactionStatus.BALANCE_PURCHASE]: 0,
    [BalanceTransactionStatus.BALANCE_REFUND]: 0,
    [BalanceTransactionStatus.BALANCE_FAILED]: 0,
  };

  const monthMap = new Map<
    string,
    { topup: number; purchase: number; refund: number }
  >();

  for (const item of items) {
    const amount = Math.abs(item.amount);
    amountsByStatus[item.status] += amount;
    countsByStatus[item.status] += 1;

    switch (item.status) {
      case BalanceTransactionStatus.BALANCE_TOPUP:
        summary.totalTopup += amount;
        summary.netChange += amount;
        break;
      case BalanceTransactionStatus.BALANCE_PURCHASE:
        summary.totalPurchase += amount;
        summary.netChange -= amount;
        break;
      case BalanceTransactionStatus.BALANCE_REFUND:
        summary.totalRefund += amount;
        summary.netChange += amount;
        break;
      case BalanceTransactionStatus.BALANCE_FAILED:
        summary.totalFailed += amount;
        break;
    }

    const monthKey = getMonthKey(new Date(item.createdAt));
    const monthEntry = monthMap.get(monthKey) ?? {
      topup: 0,
      purchase: 0,
      refund: 0,
    };

    if (item.status === BalanceTransactionStatus.BALANCE_TOPUP) {
      monthEntry.topup += amount;
    }
    if (item.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
      monthEntry.purchase += amount;
    }
    if (item.status === BalanceTransactionStatus.BALANCE_REFUND) {
      monthEntry.refund += amount;
    }

    monthMap.set(monthKey, monthEntry);
  }

  const byType = Object.values(BalanceTransactionStatus)
    .map((status) => ({
      status,
      label: TRANSACTION_TYPE_LABELS[status],
      amount: amountsByStatus[status],
      count: countsByStatus[status],
      color: TRANSACTION_CHART_COLORS[status],
    }))
    .filter((entry) => entry.count > 0);

  const byMonth = Array.from(monthMap.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(-6)
    .map(([month, values]) => ({
      month,
      monthLabel: getMonthLabel(month),
      ...values,
    }));

  return { summary, byType, byMonth };
}
