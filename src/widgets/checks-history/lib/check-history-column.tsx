import type { Check } from "@/entities/check";
import Link from "next/link";
import {
  CheckModuleLabel,
  CheckStatus,
  CheckStatusLabel,
} from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { CopyText, TableColumn } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge/Badge";
import { checkStatusVariants } from "@/shared/ui/Table/lib/check-status";
import { formatCheckSubject } from "@/shared/ui/Table/lib/format-check-subject";
import { Eye } from "lucide-react";

export function CheckActions({ check }: { check: Check }) {
  const isAvailable = check.status === CheckStatus.DONE;
  const reportHref = check.module === "GIBDD" ? "/dashboard/gibdd/report" : undefined;

  return (
    <div className="flex items-center gap-3">
      {isAvailable && reportHref ? (
        <Link aria-label="Открыть результат проверки" href={reportHref} className="flex size-8 items-center justify-center rounded-md border border-(--foreground) bg-(--accent) text-(--foreground) transition-opacity">
          <Eye size={20} strokeWidth={2.5} />
        </Link>
      ) : (
        <button type="button" aria-label="Открыть результат проверки" disabled className="flex size-8 items-center justify-center rounded-md border border-(--foreground) bg-(--accent) text-(--foreground) transition-opacity disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-70">
          <Eye size={20} strokeWidth={2.5} />
        </button>
      )}
      <button
        type="button"
        disabled={!isAvailable}
        className="text-sm text-(--foreground) underline disabled:text-slate-400 disabled:opacity-70"
      >
        Скачать
      </button>
    </div>
  );
}

export const checkColumns: TableColumn<Check>[] = [
  {
    key: "createdAt",
    title: "Дата и время",
    width: "18%",
    render: (check) => formatDate(check.createdAt),
  },
  {
    key: "id",
    title: "ID проверки",
    width: "14%",
    render: (check) => (
      <CopyText
        value={check.id}
        title="Copy ID"
        className="max-w-full text-xs text-(--foreground)"
      />
    ),
  },
  {
    key: "module",
    title: "Модуль",
    width: "15%",
    render: (check) => CheckModuleLabel[check.module],
  },
  {
    key: "subject",
    title: "Тело запроса",
    width: "22%",
    render: (check) => (
      <div className="truncate">{formatCheckSubject(check.subject)}</div>
    ),
  },
  {
    key: "status",
    title: "Статус",
    width: "13%",
    render: (check) => (
      <Badge variant={checkStatusVariants[check.status]}>
        {CheckStatusLabel[check.status]}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "Действия",
    width: "18%",
    render: (check) => <CheckActions check={check} />,
  },
];
