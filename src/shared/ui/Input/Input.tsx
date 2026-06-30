import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`px-4 py-2 rounded-lg bg-(--field) border border-(--border) text-(--field-foreground) outline-none focus:border-(--accent-border) disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});
