import type { ReactNode } from "react";
import { CheckModuleLabel, CheckStatusLabel, type Check } from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { Badge } from "@/shared/ui/Badge/Badge";
import { CopyText } from "@/shared/ui/CopyText";
import { checkStatusVariants } from "@/shared/ui/Table/lib/check-status";
import { formatCheckSubject } from "@/shared/ui/Table/lib/format-check-subject";

type CheckCardProps = { check: Check; actions?: ReactNode };

export function CheckCard({ check, actions }: CheckCardProps) {
  return <article className="rounded-lg border border-(--border) bg-(--panel-fill) p-3">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0"><p className="text-xs text-(--foreground)">Дата</p><p className="mt-1 text-sm font-medium text-(--foreground)">{formatDate(check.createdAt)}</p></div>
      <div className="shrink-0 text-right"><p className="text-xs text-(--foreground)">Статус</p><div className="mt-1"><Badge variant={checkStatusVariants[check.status]}>{CheckStatusLabel[check.status]}</Badge></div></div>
    </div>
    <div className="mt-3 grid gap-3 border-t border-(--border) pt-3">
      <div className="min-w-0"><p className="text-xs text-(--foreground)">ID</p><CopyText value={check.id} title="Copy ID" className="mt-1 max-w-full text-sm text-(--foreground)" /></div>
      <div className="min-w-0"><p className="text-xs text-(--foreground)">Модуль</p><p className="mt-1 truncate text-sm text-(--foreground)">{CheckModuleLabel[check.module]}</p></div>
      <div className="min-w-0"><p className="text-xs text-(--foreground)">Тело запроса</p><p className="mt-1 truncate text-sm text-(--foreground)">{formatCheckSubject(check.subject)}</p></div>
      {actions && <div><p className="text-xs text-(--foreground)">Действия</p><div className="mt-1">{actions}</div></div>}
    </div>
  </article>;
}
