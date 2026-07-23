import { CheckStatus } from "@/entities/check";
import type { BadgeVariant } from "@/shared/ui/Badge/Badge";

export const checkStatusLabels: Record<CheckStatus, string> = {
  [CheckStatus.PENDING]: "Ожидание",
  [CheckStatus.QUEUED]: "В очереди",
  [CheckStatus.RUNNING]: "Выполняется",
  [CheckStatus.DONE]: "Готово",
  [CheckStatus.FAILED]: "Ошибка",
};

export const checkStatusVariants: Record<CheckStatus, BadgeVariant> = {
  [CheckStatus.PENDING]: "info",
  [CheckStatus.QUEUED]: "info",
  [CheckStatus.RUNNING]: "info",
  [CheckStatus.DONE]: "success",
  [CheckStatus.FAILED]: "danger",
};
