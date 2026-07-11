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
      <div className="flex h-full min-h-0 overflow-hidden p-4 gap-4">
        <Sidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <Header />
          <div className="min-h-0 flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {children}
          </div>
        </div>
      </div>
    </MainProvider>
  );
}
