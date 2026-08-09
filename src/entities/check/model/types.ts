import type { Check } from "./fabric-schemas";

/** Значения = коды API */
export enum CheckModule {
  GIBDD = "GIBDD",
  GISTORGI = "GISTORGI",
  FSSP = "FSSP",
  BANKRUPTCY = "BANKRUPTCY",
  INN = "INN",
}

/** Значения = коды API */
export enum CheckStatus {
  PENDING = "PENDING",
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  DONE = "DONE",
  FAILED = "FAILED",
}

/** Значения = названия модулей */
export const CheckModuleLabel: Record<CheckModule, string> = {
  [CheckModule.GIBDD]: "Модуль ГИБДД",
  [CheckModule.GISTORGI]: "Модуль ГИСТОРГИ",
  [CheckModule.FSSP]: "Модуль ФССП",
  [CheckModule.BANKRUPTCY]: "Модуль банкротства",
  [CheckModule.INN]: "Модуль ИНН",
};

/** Значения = названия статусов */
export const CheckStatusLabel: Record<CheckStatus, string> = {
  [CheckStatus.PENDING]: "Ожидание",
  [CheckStatus.QUEUED]: "В очереди",
  [CheckStatus.RUNNING]: "Выполняется",
  [CheckStatus.DONE]: "Готово",
  [CheckStatus.FAILED]: "Ошибка",
};

export type ChecksStore = {
  items: Check[];
  isLoading: boolean;
  isInitialized: boolean;
  setChecks: (items: Check[]) => void;
  upsertCheck: (check: Check) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  reset: () => void;
};
