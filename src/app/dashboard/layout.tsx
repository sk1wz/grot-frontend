import { redirect } from "next/navigation";
import { getCurrentUser } from "@/entities/user/api";
import { MainProvider } from "@/shared/providers";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
import { DashboardContent } from "./DashboardContent";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <MainProvider initialUser={user}>
      <div className="flex h-full min-h-0 overflow-hidden">
        <Sidebar />
        <DashboardContent>
          <Header initialUser={user} />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </DashboardContent>
      </div>
    </MainProvider>
  );
}
