type TabOption<T extends string> = {
  key: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
};

type TabsSwitchProps<T extends string> = {
  options: TabOption<T>[];
  value: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  className?: string;
};

export function TabsSwitch<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
  className = "",
}: TabsSwitchProps<T>) {
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-lg bg-(--field) ${className}`}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = option.key === value;
        const isDisabled = disabled || option.disabled || !onChange;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange?.(option.key)}
            disabled={isDisabled}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "bg-(--accent) text-(--accent-foreground)"
                : "hover:bg-(--accent) hover:opacity-90  text-(--muted) hover:text-(--foreground)"
            } ${
              isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export type { TabOption };
