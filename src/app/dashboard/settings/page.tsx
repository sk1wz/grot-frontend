import type { Metadata } from "next";
import { SettingsWidget } from "@/widgets/settings";

export const metadata: Metadata = {
  title: "Настройки",
  description: "Настройки",
};

export default function DashboardSettingsPage() {
  return <SettingsWidget />;
}
