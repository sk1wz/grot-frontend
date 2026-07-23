import { forwardRef } from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className = "", ...props }, ref) {
    return (
      <select
        ref={ref}
        className={`w-full cursor-pointer rounded-lg bg-(--field) px-4 py-2 text-sm text-(--field-foreground) outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
