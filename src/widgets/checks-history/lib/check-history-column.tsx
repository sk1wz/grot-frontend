import type { Check } from "@/entities/check";
import { CheckModuleLabel, CheckStatusLabel } from "@/entities/check";
import { formatDate } from "@/shared/lib";
import { TableColumn } from "@/shared/ui";
import { Badge } from "@/shared/ui/Badge/Badge";
import { checkStatusVariants } from "@/shared/ui/Table/lib/check-status";
import { formatCheckSubject } from "@/shared/ui/Table/lib/format-check-subject";
import { Eye } from "lucide-react";

export const checkColumns: TableColumn<Check>[] = [
  {
    key: "createdAt",
    title: "Дата и время",
    width: "22%",
    render: (check) => formatDate(check.createdAt),
  },
  {
    key: "module",
    title: "Модуль",
    width: "18%",
    render: (check) => CheckModuleLabel[check.module],
  },
  {
    key: "subject",
    title: "Тело запроса",
    width: "28%",
    render: (check) => (
      <div className="truncate">{formatCheckSubject(check.subject)}</div>
    ),
  },
  {
    key: "status",
    title: "Статус",
    width: "16%",
    render: (check) => (
      <Badge variant={checkStatusVariants[check.status]}>
        {CheckStatusLabel[check.status]}
      </Badge>
    ),
  },
  {
    key: "actions",
    title: "Действия",
    width: "16%",
    render: (check) => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-sm underline"
          onClick={() => console.log(check.id)}
        >
          <Eye />
        </button>
        <button
          type="button"
          className="text-sm underline"
          onClick={() => console.log(check.id)}
        >
          Cкачать
        </button>
      </div>
    ),
  },
];
