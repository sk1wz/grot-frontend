import type { Check } from "@/entities/check";
import Link from "next/link";
import Image from "next/image";
import { CheckStatus, CheckStatusLabel } from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { CopyText, TableColumn } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge/Badge";
import { checkStatusVariants } from "@/shared/ui/Table/lib/check-status";
export function CheckActions({ check }: { check: Check }) {
  const isAvailable = check.status === CheckStatus.DONE;
  const reportHref =
    check.module === "GIBDD"
      ? `/dashboard/gibdd/report/${check.id}`
      : check.module === "INN"
      ? `/dashboard/inn-by-passport/report/${check.id}`
      : check.module === "GISTORGI"
      ? `/dashboard/gis-torgi/report/${check.id}`
      : check.module === "BANKRUPTCY"
      ? `/dashboard/bankruptcy/report/${check.id}`
      : undefined;

  return (
    <div className="flex items-center gap-3">
      {isAvailable && reportHref ? (
        <Link
          aria-label="Открыть результат проверки"
          href={reportHref}
          className="flex items-center gap-2 text-[14px] text-[#3e3c4b] transition-opacity"
        >
          <Image src="/images/IconEye.svg" width={30} height={24} alt="" />
          <span>Посмотреть</span>
        </Link>
      ) : (
        <button
          type="button"
          aria-label="Открыть результат проверки"
          disabled
          className="flex items-center gap-2 text-[14px] text-[#3e3c4b] transition-opacity disabled:opacity-50"
        >
          <Image src="/images/IconEye.svg" width={30} height={24} alt="" />
          <span>Посмотреть</span>
        </button>
      )}
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
    width: "20%",
    render: (check) => (
      <CopyText
        value={check.id}
        title="Copy ID"
        className="max-w-full text-xs text-(--foreground)"
      />
    ),
  },
  {
    key: "subjectBodyText",
    title: "Запрос",
    width: "31%",
    render: (check) => <div className="truncate">{check.subjectBodyText}</div>,
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
