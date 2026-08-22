"use client";

import { useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "react-toastify";
import { startBatchCheck, startCheck } from "../api";
import { buildCheckSubjectBody } from "../model";
import {
  bankruptcyConfig,
  fsspConfig,
  gibddConfig,
  gistorgiConfig,
  innConfig,
  limitationConfig,
  taxiConfig,
} from "../model/checks";
import type {
  CheckConfig,
  FieldDef,
  FieldValues,
  ModeDef,
} from "../model/types";

type CheckFormProps = {
  config: CheckConfig;
};

type CheckFormByIdProps = {
  configId: CheckConfig["id"];
};

const configsById: Record<string, CheckConfig> = {
  [bankruptcyConfig.id]: bankruptcyConfig,
  [fsspConfig.id]: fsspConfig,
  [gibddConfig.id]: gibddConfig,
  [gistorgiConfig.id]: gistorgiConfig,
  [innConfig.id]: innConfig,
  [limitationConfig.id]: limitationConfig,
  [taxiConfig.id]: taxiConfig,
};

function getFields(config: CheckConfig, mode?: ModeDef): FieldDef[] {
  return mode?.fields ?? config.fields ?? [];
}

function getDefaultValues(fields: FieldDef[]): FieldValues {
  return fields.reduce<FieldValues>((values, field) => {
    values[field.name] = field.type === "checkbox" ? false : "";
    return values;
  }, {});
}

function formatError(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray(error.issues) &&
    error.issues[0] &&
    typeof error.issues[0] === "object" &&
    "message" in error.issues[0]
  ) {
    return String(error.issues[0].message);
  }

  return "Проверьте заполнение полей";
}

function getStringValue(values: FieldValues, name: string): string {
  const value = values[name];
  return typeof value === "string" ? value : "";
}

export function CheckForm({ config }: CheckFormProps) {
  const [activeModeId, setActiveModeId] = useState(config.modes?.[0]?.id);
  const activeMode = config.modes?.find((mode) => mode.id === activeModeId);
  const fields = useMemo(
    () => getFields(config, activeMode),
    [config, activeMode]
  );
  const [values, setValues] = useState<FieldValues>(() =>
    getDefaultValues(fields)
  );
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function selectMode(mode: ModeDef) {
    setActiveModeId(mode.id);
    setValues(getDefaultValues(mode.fields));
  }

  function updateValue(field: FieldDef, value: string | boolean) {
    setValues((current) => ({
      ...current,
      [field.name]: value,
    }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (file && config.batchEndpoint) {
      setIsSubmitting(true);
      try {
        await startBatchCheck(config.batchEndpoint, file);
        toast.success("Файл принят: пакетные проверки запущены");
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить файл для проверки"
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const schema = activeMode?.schema ?? config.schema;
    const parsed = schema?.safeParse(values);

    if (parsed && !parsed.success) {
      toast.error(formatError(parsed.error));
      return;
    }

    setValues(getDefaultValues(fields));
    setIsSubmitting(true);
    try {
      await startCheck(
        config.endpoint,
        buildCheckSubjectBody(config, values, activeMode)
      );
      toast.success("Проверка успешно зарегистрирована");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось зарегистрировать проверку"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-6 px-3 py-4 sm:px-5">
      {config.modes && config.modes.length > 0 ? (
        <div
          className="mb-6 grid overflow-hidden rounded-lg bg-[#f4f8fc] shadow-[inset_0_1px_6px_rgba(15,23,42,0.12)] sm:grid-cols-[repeat(var(--tabs),minmax(0,1fr))]"
          style={{ "--tabs": config.modes.length } as React.CSSProperties}
        >
          {config.modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => selectMode(mode)}
              className={`min-h-9 cursor-pointer border-[#e2e8f0] px-3 text-xs font-semibold text-[#1f2937] transition hover:brightness-95 sm:border-r last:border-r-0 ${
                mode.id === activeModeId
                  ? "bg-[#d7e6f5] shadow-[inset_0_8px_16px_rgba(148,163,184,0.35)]"
                  : "bg-white/50 hover:bg-white"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      ) : null}

      <div
        className={`grid gap-5 ${fields.length > 1 ? "sm:grid-cols-2" : ""}`}
      >
        {fields.map((field) =>
          field.type === "checkbox" ? (
            <label
              key={field.name}
              className="flex min-h-11 items-center gap-3 px-4 py-5 rounded-[20px] bg-white text-sm font-medium text-[#1f2937] shadow-[0_3px_9px_rgba(15,23,42,0.18)]"
            >
              <input
                type="checkbox"
                checked={values[field.name] === true}
                onChange={(event) => updateValue(field, event.target.checked)}
                className="size-4 accent-[#bdd8cf]"
              />
              <span>{field.label}</span>
            </label>
          ) : (
            <input
              key={field.name}
              name={field.name}
              type={field.type === "date" ? "text" : "text"}
              value={getStringValue(values, field.name)}
              placeholder={field.placeholder ?? field.label}
              onChange={(event) => updateValue(field, event.target.value)}
              className="min-h-11  bg-white px-4 py-5 rounded-[20px] text-sm text-[#1f2937] outline-none shadow-[0_3px_9px_rgba(15,23,42,0.18)] placeholder:text-[#d5e0ec]"
            />
          )
        )}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-10 cursor-pointer rounded-[20px] bg-[#c5ddd5] p-6 text-xs font-bold uppercase shadow-(--shadow-1) text-[#1f2937] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Запуск..." : "Проверить"}
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="min-h-10 cursor-pointer rounded-[20px] bg-[#c8ced5] p-6 text-xs font-bold uppercase shadow-(--shadow-1) text-[#1f2937] transition hover:brightness-95"
        >
          Загрузить Excel
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-xs font-medium text-[#1f2937]">
        <span className="truncate">
          {file?.name ?? "Файл не выбран"}
        </span>
        <a
          href={config.templateUrl ?? "#"}
          download
          className={`inline-flex shrink-0 items-center gap-2 ${
            config.templateUrl
              ? "hover:underline"
              : "pointer-events-none opacity-70"
          }`}
        >
          Скачать шаблон
          <Download className="size-5 rounded bg-[#edf2f7] p-0.5 shadow-[0_1px_4px_rgba(15,23,42,0.25)]" />
        </a>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
    </form>
  );
}

export function CheckFormById({ configId }: CheckFormByIdProps) {
  const config = configsById[configId];

  if (!config) {
    return null;
  }

  return <CheckForm config={config} />;
}
