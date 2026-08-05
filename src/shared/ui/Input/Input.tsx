import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", autoComplete = "off", spellCheck = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      autoComplete={autoComplete}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={spellCheck}
      className={`w-full px-4 py-3 shadow-(--shadow-2) rounded-lg bg-(--field) text-(--field-foreground) outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});
