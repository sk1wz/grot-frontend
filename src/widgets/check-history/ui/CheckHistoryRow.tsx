import { Eye } from "lucide-react";
import {
  CheckStatus,
  formatCheckSubject,
  getCheckModuleLabel,
  getCheckStatusLabel,
  type Check,
} from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { Badge, BadgeVariant } from "@/shared/ui";

export type CheckHistoryRowProps = {
  check: Check;
  onViewResult: (check: Check) => void;
};

const statusVariants: Record<CheckStatus, BadgeVariant> = {
  [CheckStatus.PENDING]: "default",
  [CheckStatus.QUEUED]: "info",
  [CheckStatus.RUNNING]: "warning",
  [CheckStatus.DONE]: "success",
  [CheckStatus.FAILED]: "danger",
};

export function CheckHistoryRow({ check, onViewResult }: CheckHistoryRowProps) {
  const subjectText = formatCheckSubject(check.subject);
  const canViewResult = check.status === CheckStatus.DONE;

  return (
    <tr className="transition-colors hover:bg-(--field)/40">
      <td className="border-b border-(--border) px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-(--foreground)">
            {formatDate(check.updatedAt)}
          </span>
          <span className="mt-0.5 text-xs text-(--muted)">Обновлено</span>
        </div>
      </td>
      <td className="border-b border-(--border) px-4 py-3 text-sm text-(--foreground)">
        {getCheckModuleLabel(check.module)}
      </td>
      <td
        className="border-b border-(--border) px-4 py-3 text-sm text-(--foreground)"
        title={subjectText}
      >
        <span className="line-clamp-2 break-all">{subjectText}</span>
      </td>
      <td className="border-b border-(--border) px-4 py-3 text-sm">
        <Badge variant={statusVariants[check.status]}>
          {getCheckStatusLabel(check.status)}
        </Badge>
      </td>
      <td className="border-b border-(--border) px-4 py-3">
        {canViewResult ? (
          <button
            type="button"
            onClick={() => onViewResult(check)}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-(--border) bg-(--surface) outline-none transition-colors hover:border-(--accent-border) hover:bg-(--field)"
            aria-label="Посмотреть результат"
            title="Посмотреть результат"
          >
            <Eye size={18} color="var(--icon-color)" strokeWidth={2} />
          </button>
        ) : (
          <span
            aria-hidden
            className="inline-flex size-8 rounded-lg border border-(--border) bg-(--field)/30"
          />
        )}
      </td>
    </tr>
  );
}
