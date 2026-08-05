export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer px-4 py-2.5 shadow-(--shadow-1) rounded-full bg-(--accent) hover:opacity-90 text-(--foreground) outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm ${className}`}
      {...props}
    />
  );
}
