import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", autoComplete = "off", spellCheck = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      suppressHydrationWarning
      autoComplete={autoComplete}
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck={spellCheck}
      className={`w-full text-sm px-4 py-5 rounded-[20px] shadow-[0_3px_9px_rgba(15,23,42,0.18)] placeholder:text-[#d5e0ec] bg-(--field) text-(--foreground) outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
});
