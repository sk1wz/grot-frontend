"use client";

import { ChecksGrid } from "@/features/checker";

export function ChecksWidget() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">
      <ChecksGrid />
    </section>
  );
}
