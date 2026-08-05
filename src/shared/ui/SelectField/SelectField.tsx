import { Select } from "../Select/Select";

export type SelectFieldOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export type SelectFieldProps<TValue extends string = string> = {
  value: TValue;
  onChange: (value: TValue) => void;
  options: SelectFieldOption<TValue>[];
  label?: string;
  id?: string;
  className?: string;
};

export function SelectField<TValue extends string = string>({
  value,
  onChange,
  options,
  label = "Фильтр",
  id = "select-field",
  className = "",
}: SelectFieldProps<TValue>) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-xs md:text-sm font-medium text-(--foreground)">
        {label}
      </label>
      <Select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as TValue)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
