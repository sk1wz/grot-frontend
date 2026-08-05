import { Input } from "../Input/Input";

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
};

export function SearchField({
  value,
  onChange,
  label = "Поиск",
  placeholder = "Поиск...",
  id = "search-field",
  className = "",
}: SearchFieldProps) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-xs md:text-sm font-medium text-(--foreground)">
        {label}
      </label>
      <Input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
