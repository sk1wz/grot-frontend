import { CheckStatus } from "@/entities/check";
import type { BadgeVariant } from "@/shared/ui/Badge/Badge";

export const checkStatusVariants: Record<CheckStatus, BadgeVariant> = {
  [CheckStatus.PENDING]: "info",
  [CheckStatus.QUEUED]: "info",
  [CheckStatus.RUNNING]: "info",
  [CheckStatus.DONE]: "success",
  [CheckStatus.FAILED]: "danger",
};
