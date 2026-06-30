"use client";
import { useUserStore } from "@/entities/user";
import { Text, TextTitle } from "@/shared/ui";

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-(--border) bg-(--surface) p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <Text className="text-sm font-semibold">{title}</Text>
        <Text className="text-xs text-(--muted)">{description}</Text>
      </div>
      {children}
    </div>
  );
}

export function SettingsWidget() {
  const user = useUserStore((state) => state.user);
  return (
    <section className="mx-auto w-full max-w-[1440px] rounded-4xl border border-(--border) bg-(--surface) p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <TextTitle className="text-2xl font-semibold tracking-tight">
            Личные данные
          </TextTitle>

          <SettingRow
            title="Почта"
            description="Email, привязанный к вашему аккаунту."
          >
            <Text className="text-sm font-medium">{user?.email ?? "—"}</Text>
          </SettingRow>
        </div>
      </div>
    </section>
  );
}
