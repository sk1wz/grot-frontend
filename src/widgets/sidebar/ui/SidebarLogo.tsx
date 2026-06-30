import Link from "next/link";
import { Text } from "@/shared/ui";

export function SidebarLogo() {
  return (
    <Link
      href="/dashboard"
      className=" flex items-center gap-3 px-2 py-2 outline-none"
      aria-label="На главную"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1a1a] text-sm font-bold text-(--accent)">
        ГРОТ
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <Text className="text-sm font-semibold leading-tight">Грот</Text>
        <Text className="text-[11px] leading-tight text-(--muted)">
          платформа для проверки данных
        </Text>
      </span>
    </Link>
  );
}
