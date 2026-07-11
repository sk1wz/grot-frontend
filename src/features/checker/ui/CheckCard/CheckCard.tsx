"use client";

import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import type { StartCheckResponse } from "@/entities/check";
import { Button, Card, Input, Select, Text } from "@/shared/ui";
import { startCheck } from "../../api";
import { buildCheckBody } from "../../model/build-body";
import type {
  CheckConfig,
  FieldDef,
  FieldValues,
  ModeDef,
} from "../../model/types";

type CheckCardProps = {
  config: CheckConfig;
  availableFeatures?: string[];
};

function getAvailableModes(
  config: CheckConfig,
  availableFeatures: string[]
): ModeDef[] {
  if (!config.modes) {
    return [];
  }

  return config.modes.filter(
    (mode) =>
      !mode.requiresFeature || availableFeatures.includes(mode.requiresFeature)
  );
}

function getFirstErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "issues" in error &&
    Array.isArray(error.issues) &&
    error.issues[0] &&
    typeof error.issues[0] === "object" &&
    error.issues[0] !== null &&
    "message" in error.issues[0] &&
    typeof error.issues[0].message === "string"
  ) {
    return error.issues[0].message;
  }

  return "Проверьте заполнение полей";
}

function CheckField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string | boolean | undefined;
  onChange: (next: string | boolean) => void;
}) {
  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-4 accent-emerald-600"
          checked={value === true}
          onChange={(event) => onChange(event.target.checked)}
        />
        <Text>{field.label}</Text>
      </label>
    );
  }

  return (
    <Input
      className="w-full text-sm"
      placeholder={field.placeholder ?? field.label}
      value={typeof value === "string" ? value : ""}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function CheckCard({ config, availableFeatures = [] }: CheckCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modes = useMemo(
    () => getAvailableModes(config, availableFeatures),
    [config, availableFeatures]
  );

  const [modeId, setModeId] = useState(modes[0]?.id ?? "");
  const [values, setValues] = useState<FieldValues>({});
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeMode = modes.find((mode) => mode.id === modeId);
  const fields = activeMode?.fields ?? config.fields ?? [];
  const schema = activeMode?.schema ?? config.schema;

  const handleModeChange = (nextModeId: string) => {
    setModeId(nextModeId);
    setValues({});
  };

  const handleFieldChange = (name: string, next: string | boolean) => {
    setValues((current) => ({ ...current, [name]: next }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file?.name ?? null);
  };

  const handleExcelClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!schema) {
      return;
    }

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      toast.error(getFirstErrorMessage(parsed.error));
      return;
    }

    const body = buildCheckBody(config, parsed.data, activeMode);
    setIsSubmitting(true);

    try {
      await toast.promise(startCheck(config.endpoint, body), {
        pending: "Запуск проверки...",
        success: {
          render: ({ data }: { data: StartCheckResponse }) =>
            `Проверка ${data.id} поставлена в очередь`,
        },
        error: {
          render: ({ data }: { data: Error }) => data.message,
        },
      });
      setValues({});
    } catch {
      // Ошибка уже показана через toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="min-h-100 flex h-full flex-col gap-4 rounded-2xl border border-(--border) p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <Text className="text-base font-semibold text-blue-900 dark:text-blue-300">
          {config.title}
        </Text>
        <Text className="text-xs text-(--muted)">{config.description}</Text>
        <Text className="text-xs text-(--muted)">
          {config.price} ₽ · async · {config.eta}
        </Text>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {modes.length > 0 && (
          <Select
            value={modeId}
            onChange={(event) => handleModeChange(event.target.value)}
          >
            {modes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </Select>
        )}

        {fields.map((field) => (
          <CheckField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(next) => handleFieldChange(field.name, next)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="bg-(--accent) text-(--accent-foreground) hover:opacity-90"
          >
            Запустить проверку
          </Button>
          <Button
            type="button"
            onClick={handleExcelClick}
            className="border border-(--border) bg-(--surface) text-(--foreground) hover:opacity-90"
          >
            Загрузить Excel
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <Text className="text-(--muted)">{fileName ?? "Файл не выбран"}</Text>
          {config.templateUrl ? (
            <a
              href={config.templateUrl}
              className="text-blue-600 underline hover:opacity-80"
            >
              Скачать шаблон
            </a>
          ) : (
            <Text className="text-(--muted)">Шаблон скоро</Text>
          )}
        </div>
      </div>
    </Card>
  );
}
