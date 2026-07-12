"use client";

import { X } from "lucide-react";
import { Text } from "@/shared/ui";

export type CheckResultModalProps = {
  isOpen: boolean;
  checkId?: string;
  result: unknown;
  onClose: () => void;
};

export function CheckResultModal({
  isOpen,
  checkId,
  result,
  onClose,
}: CheckResultModalProps) {
  if (!isOpen) {
    return null;
  }

  const hasResult = result != null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="check-result-title"
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-(--border) bg-(--surface) shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-(--border) px-4 py-3">
          <div>
            <Text className="text-sm font-semibold text-(--foreground)">
              Результат проверки
            </Text>
            {checkId ? (
              <Text className="mt-1 text-xs text-(--muted)">ID: {checkId}</Text>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-(--border) bg-(--surface) outline-none transition-colors hover:bg-(--field)"
            aria-label="Закрыть"
          >
            <X size={18} color="var(--icon-color)" strokeWidth={2} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-4">
          {hasResult ? (
            <pre className="overflow-x-auto rounded-lg border border-(--border) bg-(--field)/40 p-4 text-xs leading-relaxed text-(--foreground)">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <Text className="text-sm text-(--muted)">
              Результат пока недоступен. Проверка ещё выполняется или
              завершилась без данных.
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
