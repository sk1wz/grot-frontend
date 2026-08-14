import { forwardRef } from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className = "", ...props }, ref) {
    return (
      <select
        ref={ref}
        className={`w-full rounded-[20px] bg-(--field) px-4 py-5 pr-10 text-sm text-[#d5e0ec] shadow-[0_3px_9px_rgba(15,23,42,0.18)] outline-none [&>option]:text-(--foreground) disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
