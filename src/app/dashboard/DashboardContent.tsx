"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function DashboardContent({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const isAdminPage = pathname.startsWith("/dashboard/admin");

  return (
    <div
      className={`mx-auto flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden px-4 py-4 md:px-15 md:py-7.5 ${
        isAdminPage ? "max-w-full" : "max-w-300"
      }`}
    >
      {children}
    </div>
  );
}
