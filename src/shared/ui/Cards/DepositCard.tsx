import {
  BalanceTransactionStatus,
  type BalanceTransactionType,
} from "@/entities/balance";
import { formatAmount, formatDate } from "@/shared/lib";
import { BadgeTransaction } from "@/shared/ui/Badge/BadgeTransaction";
import { CopyText } from "@/shared/ui/CopyText";
import { TextParagraph } from "@/shared/ui/Text/TextParagraph";

type DepositCardProps = {
  transaction: BalanceTransactionType;
};

function formatTransactionAmount(transaction: BalanceTransactionType) {
  const amount = formatAmount(Math.abs(transaction.amount));

  if (transaction.status === BalanceTransactionStatus.BALANCE_TOPUP) {
    return `+${amount}`;
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return `-${amount}`;
  }

  return amount;
}

function getAmountClassName(transaction: BalanceTransactionType) {
  if (transaction.status === BalanceTransactionStatus.BALANCE_TOPUP) {
    return "text-emerald-700";
  }

  if (transaction.status === BalanceTransactionStatus.BALANCE_PURCHASE) {
    return "text-rose-700";
  }

  return "text-(--foreground)";
}

export function DepositCard({ transaction }: DepositCardProps) {
  return (
    <article className="rounded-lg border border-(--border) bg-[#F4F7FA] p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <TextParagraph>Дата</TextParagraph>
          <TextParagraph className="mt-1 font-medium">
            {formatDate(transaction.createdAt)}
          </TextParagraph>
        </div>
        <div className="shrink-0 text-right">
          <TextParagraph>Сумма</TextParagraph>
          <TextParagraph
            className={`mt-1 whitespace-nowrap font-semibold ${getAmountClassName(
              transaction
            )}`}
          >
            {formatTransactionAmount(transaction)}
          </TextParagraph>
        </div>
      </div>

      <div className="mt-3 grid gap-3 border-t border-(--border) pt-3">
        <div className="min-w-0">
          <TextParagraph>ID транзакции</TextParagraph>
          <CopyText
            value={transaction.id}
            title="Скопировать ID транзакции"
            className="mt-1 max-w-full text-sm text-(--foreground)"
          >
            {transaction.id}
          </CopyText>
        </div>
        <div>
          <TextParagraph>Статус</TextParagraph>
          <div className="mt-1">
            <BadgeTransaction status={transaction.status} />
          </div>
        </div>
        <div className="min-w-0">
          <TextParagraph>Действие</TextParagraph>
          <TextParagraph className="mt-1 truncate">
            {transaction.meta?.action ?? "—"}
          </TextParagraph>
        </div>
      </div>
    </article>
  );
}
