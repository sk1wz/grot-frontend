export type BadgeVariant =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "danger";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-(--field) text-(--foreground) ring-1 ring-inset ring-(--border)",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  info: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  danger: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
