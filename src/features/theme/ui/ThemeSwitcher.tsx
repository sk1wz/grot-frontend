"use client";
import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Skeleton, TabOption, TabsSwitch } from "@/shared/ui";

type Theme = "light" | "dark" | "system";

const themeOptions: TabOption<Theme>[] = [
  { key: "system", label: "Системная", icon: Monitor },
  { key: "light", label: "Светлая", icon: Sun },
  { key: "dark", label: "Темная", icon: Moon },
];

function ThemeSwitcherSkeleton() {
  return (
    <div
      aria-hidden
      className="inline-flex flex-wrap items-center gap-2 rounded-lg bg-(--field)"
    >
      <Skeleton className="h-[30px] w-[104px] rounded-lg" />
      <Skeleton className="h-[30px] w-[80px] rounded-lg" />
      <Skeleton className="h-[30px] w-[72px] rounded-lg" />
    </div>
  );
}

export function ThemeSwitcher() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  if (!mounted || !theme) {
    return <ThemeSwitcherSkeleton />;
  }

  return (
    <TabsSwitch
      options={themeOptions}
      value={theme as Theme}
      onChange={(nextTheme) => setTheme(nextTheme)}
    />
  );
}
