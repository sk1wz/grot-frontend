"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type MultiSelectOption<TValue extends string = string> = {
  value: TValue;
  label: string;
  icon?: ReactNode;
};

type MultiSelectFieldProps<TValue extends string = string> = {
  value: TValue[];
  onChange: (value: TValue[]) => void;
  options: MultiSelectOption<TValue>[];
  label?: string;
  allLabel?: string;
  id?: string;
  className?: string;
};

export function MultiSelectField<TValue extends string = string>({
  value,
  onChange,
  options,
  label = "Фильтр",
  allLabel = "Все",
  id,
  className = "",
}: MultiSelectFieldProps<TValue>) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<TValue[]>(value);

  useEffect(() => {
    if (!isOpen) setDraftValue(value);
  }, [isOpen, value]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const isAllSelected = draftValue.length === options.length;
  const triggerLabel =
    value.length === 0 || value.length === options.length
      ? allLabel
      : `Выбрано: ${value.length}`;

  function toggleOption(option: TValue) {
    setDraftValue((current) =>
      current.includes(option)
        ? current.filter((value) => value !== option)
        : [...current, option]
    );
  }

  function toggleAll() {
    setDraftValue(isAllSelected ? [] : options.map((option) => option.value));
  }

  function apply() {
    onChange(draftValue);
    setIsOpen(false);
  }

  return (
    <div
      ref={rootRef}
      className={`relative flex w-full flex-col gap-2 ${className}`}
    >
      <span
        id={`${fieldId}-label`}
        className="text-sm font-medium text-[#868A85]"
      >
        {label}
      </span>
      <button
        id={fieldId}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-labelledby={`${fieldId}-label ${fieldId}`}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between rounded-[20px] bg-(--field) px-4 py-5 text-left text-sm text-(--foreground) shadow-[0_3px_9px_rgba(15,23,42,0.18)] outline-none transition-shadow hover:shadow-[0_4px_12px_rgba(15,23,42,0.22)] focus-visible:ring-2 focus-visible:ring-[#3e3c4b]"
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={`size-5 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={label}
          className="absolute top-full z-30 mt-2 w-full overflow-hidden rounded-b-[20px] bg-white py-4 shadow-[0_4px_5px_rgba(62,60,75,0.2)]"
        >
          <div className="flex flex-col gap-2">
            <MultiSelectOptionRow
              label={allLabel}
              checked={isAllSelected}
              onClick={toggleAll}
            />
            {options.map((option) => (
              <MultiSelectOptionRow
                key={option.value}
                label={option.label}
                icon={option.icon}
                checked={draftValue.includes(option.value)}
                onClick={() => toggleOption(option.value)}
              />
            ))}
          </div>
          <div className="mt-4 flex h-[50px] items-center gap-5 px-[18px]">
            <button
              type="button"
              onClick={() => setDraftValue([])}
              className="flex-1 cursor-pointer text-left text-sm text-[#868a85] underline"
            >
              Очистить
            </button>
            <button
              type="button"
              onClick={apply}
              className="h-[50px] flex-1 cursor-pointer rounded-[10px] bg-[#c8ddd5] px-3 text-sm font-bold uppercase text-[#3e3c4b] shadow-[inset_0_-5px_5px_#a5a7b1,inset_0_5px_5px_white,0_4px_10px_rgba(62,60,75,0.2)]"
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MultiSelectOptionRow({
  label,
  icon,
  checked,
  onClick,
}: {
  label: string;
  icon?: ReactNode;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className="flex h-[50px] w-full cursor-pointer items-center gap-3 rounded-[20px] py-1 pr-3 pl-5 text-left text-sm font-bold uppercase text-[#3e3c4b]"
    >
      <span className="flex flex-1 items-center gap-2.5">
        {icon}
        {label}
      </span>
      <span className="grid size-6 place-items-center rounded-[4px_1px_4px_1px] border-2 border-[#3e3c4b]">
        {checked && <Check className="size-4" strokeWidth={3} />}
      </span>
    </button>
  );
}
