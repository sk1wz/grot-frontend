import { MainProvider } from "@/shared/providers/MainProvider/MainProvider";
import { Header } from "@/widgets/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainProvider>
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
        <Header />
        <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {children}
        </div>
      </div>
    </MainProvider>
  );
}
