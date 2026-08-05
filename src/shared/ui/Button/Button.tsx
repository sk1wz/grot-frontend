export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer px-5 py-4 shadow-(--shadow-1) rounded-full bg-(--accent) text-(--accent-foreground) outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}
