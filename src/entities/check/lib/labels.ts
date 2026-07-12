import { CheckModule, CheckStatus } from "../model/types";

const CHECK_MODULE_LABELS: Record<CheckModule, string> = {
  [CheckModule.GIBDD]: "ГИБДД",
  [CheckModule.GISTORGI]: "ГИС Торги",
  [CheckModule.FSSP]: "ФССП",
  [CheckModule.BANKRUPTCY]: "Банкротство",
  [CheckModule.INN]: "ИНН",
};

const CHECK_STATUS_LABELS: Record<CheckStatus, string> = {
  [CheckStatus.PENDING]: "Ожидание",
  [CheckStatus.QUEUED]: "В очереди",
  [CheckStatus.RUNNING]: "Выполняется",
  [CheckStatus.DONE]: "Завершена",
  [CheckStatus.FAILED]: "Ошибка",
};

export function getCheckModuleLabel(module: CheckModule): string {
  return CHECK_MODULE_LABELS[module];
}

export function getCheckStatusLabel(status: CheckStatus): string {
  return CHECK_STATUS_LABELS[status];
}
