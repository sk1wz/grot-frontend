"use client";

export type TabOption<T extends string> = {
  value: T;
  label: string;
};

type TabsProps<T extends string> = {
  value: T;
  options: readonly TabOption<T>[];
  onChange: (value: T) => void;
  className?: string;
};

export function Tabs<T extends string>({
  value,
  options,
  onChange,
  className = "",
}: TabsProps<T>) {
  return (
    <div
      className={`flex w-fit gap-1 rounded-xl bg-(--surface) p-1 text-(--foreground) ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            value === option.value
              ? "bg-white font-semibold shadow-sm"
              : "hover:bg-white/60"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
