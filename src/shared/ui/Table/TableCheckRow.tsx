import type { Check } from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { Badge } from "@/shared/ui/Badge/Badge";
import { checkStatusLabels, checkStatusVariants } from "./lib/check-status";
import { formatCheckSubject } from "./lib/format-check-subject";

export type TableCheckRowProps = {
  check: Check;
  className?: string;
};

export function TableCheckRow({ check, className = "" }: TableCheckRowProps) {
  const formattedDate = formatDate(check.createdAt);
  const subjectLabel = formatCheckSubject(check.subject);
  const statusLabel = checkStatusLabels[check.status];
  const statusVariant = checkStatusVariants[check.status];

  return (
    <tr className={`transition-colors hover:bg-(--field) ${className}`}>
      <td className="border-b border-(--border) px-4 py-3 text-sm text-(--foreground)">
        {formattedDate}
      </td>
      <td className="truncate border-b border-(--border) px-4 py-3 text-sm text-(--foreground)">
        {subjectLabel}
      </td>
      <td className="border-b border-(--border) px-4 py-3 text-sm">
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </td>
      <td className="border-b border-(--border) px-4 py-3 text-sm text-(--foreground)">
        {/* Действия — пока пусто */}
      </td>
    </tr>
  );
}
