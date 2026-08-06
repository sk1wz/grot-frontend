import type { ReactNode } from "react";
import {
  CheckModuleLabel,
  CheckStatusLabel,
  type Check,
} from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { Badge } from "@/shared/ui/Badge/Badge";
import { CopyText } from "@/shared/ui/CopyText";
import { TextParagraph } from "@/shared/ui/Text/TextParagraph";
import { checkStatusVariants } from "@/shared/ui/Table/lib/check-status";
import { formatCheckSubject } from "@/shared/ui/Table/lib/format-check-subject";

type CheckCardProps = { check: Check; actions?: ReactNode };

export function CheckCard({ check, actions }: CheckCardProps) {
  return (
    <article className="rounded-lg border border-(--border) bg-[#F4F7FA] p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <TextParagraph>Дата</TextParagraph>
          <TextParagraph className="mt-1 font-medium">
            {formatDate(check.createdAt)}
          </TextParagraph>
        </div>
        <div className="shrink-0 text-right">
          <TextParagraph>Статус</TextParagraph>
          <div className="mt-1">
            <Badge variant={checkStatusVariants[check.status]}>
              {CheckStatusLabel[check.status]}
            </Badge>
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-3 border-t border-(--border) pt-3">
        <div className="min-w-0">
          <TextParagraph>ID</TextParagraph>
          <CopyText
            value={check.id}
            title="Copy ID"
            className="mt-1 max-w-full text-sm text-(--foreground)"
          />
        </div>
        <div className="min-w-0">
          <TextParagraph>Модуль</TextParagraph>
          <TextParagraph className="mt-1 truncate">
            {CheckModuleLabel[check.module]}
          </TextParagraph>
        </div>
        <div className="min-w-0">
          <TextParagraph>Тело запроса</TextParagraph>
          <TextParagraph className="mt-1 truncate">
            {formatCheckSubject(check.subject)}
          </TextParagraph>
        </div>
        {actions && (
          <div>
            <TextParagraph>Действия</TextParagraph>
            <div className="mt-1">{actions}</div>
          </div>
        )}
      </div>
    </article>
  );
}
