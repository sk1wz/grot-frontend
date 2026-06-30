type ToggleRoundProps = {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function ToggleRound({
  checked,
  onChange,
  disabled = false,
  className = "",
}: ToggleRoundProps) {
  const isDisabled = disabled || !onChange;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={isDisabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors ${
        checked
          ? "border-(--accent) bg-(--accent)"
          : "border-(--border) bg-(--field)"
      } ${
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-(--field) shadow-sm transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
