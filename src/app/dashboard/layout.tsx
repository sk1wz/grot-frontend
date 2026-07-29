import { MainProvider } from "@/shared/providers";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainProvider>
      <div className="flex h-full min-h-0 overflow-hidden">
        <Sidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden p-4">
          <Header />
          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </MainProvider>
  );
}
