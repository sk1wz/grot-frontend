import { forwardRef } from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className = "", ...props }, ref) {
    return (
      <select
        ref={ref}
        className={`w-full text-sm px-4 py-2.5 shadow-(--shadow-2) rounded-lg bg-(--field) text-(--foreground) outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);
